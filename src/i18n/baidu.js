import md5 from "md5"
import axios from "axios"

const queryHandler = (allText) => {
  // 标准版单次最长请求由6000字节改为1000字符
  allText = allText.reduce((a, b) => {
    if (a.length > 0) {
      let lastArr = a.pop();
      if (lastArr.length < 20)
        return [...a, [...lastArr, b]]
      return [...a, lastArr, [b]]
    }

    return [...a, [b]]
  }, [])
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  return allText.map(v => v.join('\n'))
}

// https://api.fanyi.baidu.com/api/trans/product/desktop
export const translate = async (allText, from, to) => {
  try {
    const allTextValues = Object.values(allText)
    const allTextKeys = Object.keys(allText)
    querys = queryHandler(allTextValues);
    let res = [];
    for (let i = 0; i < querys.length; i++) {
      const query = querys[i]
      const salt = (new Date).getTime();
      const str1 = global.i18n.config.appid + query + salt + global.i18n.config.key;
      const sign = md5(str1);
      const response = await axios.get('http://api.fanyi.baidu.com/api/trans/vip/translate', {
        params: {
          q: query,
          appid: global.i18n.config.appid,
          salt: salt,
          from: from,
          to: to,
          sign: sign
        }
      })
      const result = response.data
      if (result && result.error_code)
        throw new Error(result.error_code)

      res = [...res, ...result.trans_result]
    }
    return allTextKeys.map(key => {
      let find = res.find(v => v.src === allText[key])
      if (!find) find = { src: '', dst: '' }
      return [key, find.dst]
    }).reduce((a, b) => { return { ...a, [b[0]]: b[1] } }, {})
  } catch (error) {
    console.log(error)
  }
}


