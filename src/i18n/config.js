const fs = require('fs')
const path = require('path')

export const appid = ''
export const key = ''
// 语种 https://api.fanyi.baidu.com/doc/21
// export const from = 'zh'
export const from = 'cht'
export const to = ['en', 'zh']
export const ignoreDirs = [
  '.hbuilderx', 'node_modules', 'uni_modules', 'unpackage', '.git', 'dist', 'static'
]
export const ignoreExts = [".woff2", '.jpg', '.png', '.pdf', '.keystore']
export const reg = new RegExp(/\$t\(('|"|`)(.*?)('|"|`)\)/g)
export const prefix = 'i18n_';
export const handlerResult = (allText, nextKey, [_, $1, $2, $3]) => {
  allText[nextKey] = $2;
  return allText
}
export const handlerTemlpate = (allText, nextKey, [_, $1, $2, $3]) => {
  return `$t(${$1}${nextKey}${$3})`
}

let json
export const getCacheFromJson = () => {
  if (json) return json;
  const jsonFile = fs.readFileSync(path.resolve(global.i18n.cacheDir, `./${global.i18n.cacheDir}.json`), 'utf-8')
  json = JSON.parse(jsonFile)
  return json;
}

export const backHandler = (allText, nextKey, [_, $1, $2, $3]) => {
  const json = getCacheFromJson();
  return `$t(${$1}${json[nextKey] ? json[nextKey] : ''}${$3})`
}
