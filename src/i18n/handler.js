import { resolve, extname } from "path"
import { readdirSync, statSync, readFileSync, writeFileSync } from "fs"
import MagicString from "magic-string"

// 唯一id
let i18nIndex = 0;
function nextKey() {
  ++i18nIndex;
  return `${global.i18n.config.prefix}${i18nIndex}`;
}
let allText = {};

const deepRead = (root) => {
  let dirs = readdirSync(root)
  // 过滤不处理文件夹
  dirs = dirs.filter(dir => !global.i18n.config.ignoreDirs.includes(dir))
  dirs.forEach(dirPath => {
    const fullPath = resolve(root, dirPath)
    const fileStat = statSync(fullPath)
    if (fileStat.isDirectory()) {
      deepRead(resolve(root, dirPath))
    } else {
      const file = readFileSync(fullPath, 'utf-8')

      // 过滤不处理文件
      if (global.i18n.config.ignoreExts.includes(extname(fullPath || ''))) return

      const fileString = new MagicString(file);
      fileString.replace(global.i18n.config.reg, (...args) => {
        const key = nextKey()
        allText = global.i18n.config.handlerResult(allText, key, args)

        // 回退
        if (global.i18n.back) {
          return global.i18n.config.backHandler(allText, key, args)
        }
        return global.i18n.config.handlerTemlpate(allText, key, args)
      })
      writeFileSync(fullPath, fileString.toString());

      // // 重写文件 sourceMap
      // if (fileString.hasChanged()) {
      //   const fileMap = fileString.generateMap({
      //     source: fullPath,
      //     file: `${fullPath}.map`,
      //     includeContent: true
      //   });
      //   writeFileSync(`${fullPath}.map`, fileMap.toString());
      // }
    }
  })
}


export default function (root) {
  deepRead(root)
  return allText;
}
