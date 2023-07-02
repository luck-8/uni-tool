import { resolve } from "path";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import handler from "./handler";
import { translate } from "./baidu";
import * as defaultConfig from "./config";

global.i18n = {}
global.i18n.config = defaultConfig;

// 提取需要翻译的文本， 并修改代码
export default async function () {
  const root = process.cwd();
  global.i18n.cacheDir = resolve(root, ".i18n");
  // 读取项目本地配置
  if (existsSync(resolve(global.i18n.cacheDir, 'config.js'))) {
    const config = require(resolve(global.i18n.cacheDir, 'config.js'))
    global.i18n.config = config
  }
  if (!existsSync(global.i18n.cacheDir)) mkdirSync(global.i18n.cacheDir);

  // 获取所有文本
  const allText = handler(root);
  // 不进行翻译
  if (global.i18n.back) return

  // 缓存原文本
  // 格式： {uniKey: text}
  writeFileSync(
    resolve(global.i18n.cacheDir, `${global.i18n.config.from}.json`),
    JSON.stringify(allText, null, 2)
  );

  // 读取缓存数据
  let cacheTmpData = {}
  let cache = {}
  if (existsSync(resolve(global.i18n.cacheDir, 'cache.json'))) {
    cache = require(resolve(global.i18n.cacheDir, 'cache.json'))
  }
  cacheTmpData[global.i18n.config.from] = allText

  // 生成翻译数据
  for (let toTranslate of global.i18n.config.to) {
    let finalTranslateText = []
    // 获取缓存的翻译文件， 对比翻译
    let filterText = JSON.parse(JSON.stringify(allText))

    if (cache) {
      const cacheKeys = Object.keys(cache)
      filterText = Object.keys(filterText).reduce((pre, cur) => {
        if (!cacheKeys.includes(filterText[cur]) || !cache[filterText[cur]][toTranslate]) {
          return { ...pre, [cur]: filterText[cur] }
        }
        finalTranslateText[cur] = cache[filterText[cur]][toTranslate];
        return pre
      }, {})
    }
    // 翻译
    console.log(filterText, '翻译数据', toTranslate)
    const translateText = await translate(
      filterText,
      global.i18n.config.from,
      toTranslate
    );
    // 合并缓存数据 + 翻译数据
    finalTranslateText = { ...finalTranslateText, ...translateText }
    // 排序对象
    finalTranslateText = Object.keys(finalTranslateText).sort(
      (pre, cur) =>
        Number(pre.replace(global.i18n.config.prefix, '')) - Number(cur.replace(global.i18n.config.prefix, ''))
    ).reduce((pre, cur) => {
      return { ...pre, [cur]: finalTranslateText[cur] }
    }, {})
    // 格式： {uniKey: text}
    writeFileSync(
      resolve(global.i18n.cacheDir, `${toTranslate}.json`),
      JSON.stringify(finalTranslateText, null, 2)
    );
    // 保持临时缓存
    cacheTmpData[toTranslate] = translateText
  }

  const langs = Object.keys(cacheTmpData)
  const cacheRes = (Object.keys(cacheTmpData[global.i18n.config.from]).reduce((a, b) => {
    let key = cacheTmpData[global.i18n.config.from][b]
    let item = langs.reduce((pre, cur) => {
      if (cacheTmpData[cur][b])
        return { ...pre, [cur]: cacheTmpData[cur][b] }
      return pre
    }, {})
    if (a[key]) {
      a[key] = { ...a[key], ...item }
    } else {
      a[key] = item
    }
    return a;
  }, cache))
  // 生成缓存数据
  writeFileSync(
    resolve(global.i18n.cacheDir, 'cache.json'),
    JSON.stringify(cacheRes, null, 2)
  );
}
