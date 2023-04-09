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
  // return `$t(${$1}${nextKey}${$3}, ${$1}${$2}${$3})`
  return `$t(${$1}${nextKey}${$3})`
}


// // import en from './en.json'
// // import zhHans from './zh-Hans.json'
// // import zhHant from './zh-Hant.json'

// import en from '../.i18n/en.json'
// import zhHans from '../.i18n/zh.json'
// import zhHant from '../.i18n/cht.json'
// export default {
// 	en,
// 	'zh-Hans': zhHans,
// 	'zh-Hant': zhHant
// }
