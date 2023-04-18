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

  // 获取缓存的翻译文件， 对比翻译
  // TODO

  // 缓存， 生成
  // 格式： {uniKey: text}
  writeFileSync(
    resolve(global.i18n.cacheDir, `${global.i18n.config.from}.json`),
    JSON.stringify(allText, null, 2)
  );

  // 生成翻译数据
  global.i18n.config.to.forEach(async toTranslate => {
    const translateText = await translate(
      allText,
      global.i18n.config.from,
      toTranslate
    );

    // 格式： {uniKey: text}
    writeFileSync(
      resolve(global.i18n.cacheDir, `${toTranslate}.json`),
      JSON.stringify(translateText, null, 2)
    );
  })

}
