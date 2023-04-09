var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/cli.ts
import cac from "cac";

// src/i18n/index.js
import { resolve as resolve2 } from "path";
import { readFileSync as readFileSync2, writeFileSync as writeFileSync2, existsSync, mkdirSync } from "fs";

// src/i18n/handler.js
import { resolve, extname } from "path";
import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import MagicString from "magic-string";
var i18nIndex = 0;
function nextKey() {
  ++i18nIndex;
  return `${global.i18n.config.prefix}${i18nIndex}`;
}
var allText = {};
var deepRead = (root) => {
  let dirs = readdirSync(root);
  dirs = dirs.filter((dir) => !global.i18n.config.ignoreDirs.includes(dir));
  dirs.forEach((dirPath) => {
    const fullPath = resolve(root, dirPath);
    const fileStat = statSync(fullPath);
    if (fileStat.isDirectory()) {
      deepRead(resolve(root, dirPath));
    } else {
      const file = readFileSync(fullPath, "utf-8");
      if (global.i18n.config.ignoreExts.includes(extname(fullPath || "")))
        return;
      const fileString = new MagicString(file);
      fileString.replace(global.i18n.config.reg, (...args) => {
        const key2 = nextKey();
        allText = global.i18n.config.handlerResult(allText, key2, args);
        return global.i18n.config.handlerTemlpate(allText, key2, args);
      });
      writeFileSync(fullPath, fileString.toString());
    }
  });
};
function handler_default(root) {
  deepRead(root);
  return allText;
}

// src/i18n/baidu.js
import md5 from "md5";
import axios from "axios";
var queryHandler = (allText2) => {
  allText2 = allText2.reduce((a, b) => {
    if (a.length > 0) {
      let lastArr = a.pop();
      if (lastArr.length < 20)
        return [...a, [...lastArr, b]];
      return [...a, lastArr, [b]];
    }
    return [...a, [b]];
  }, []);
  return allText2.map((v) => v.join("\n"));
};
var translate = async (allText2, from2, to2) => {
  try {
    const allTextValues = Object.values(allText2);
    const allTextKeys = Object.keys(allText2);
    querys = queryHandler(allTextValues);
    let res = [];
    for (let i = 0; i < querys.length; i++) {
      const query = querys[i];
      const salt = (/* @__PURE__ */ new Date()).getTime();
      const str1 = global.i18n.config.appid + query + salt + global.i18n.config.key;
      const sign = md5(str1);
      const response = await axios.get("http://api.fanyi.baidu.com/api/trans/vip/translate", {
        params: {
          q: query,
          appid: global.i18n.config.appid,
          salt,
          from: from2,
          to: to2,
          sign
        }
      });
      const result = response.data;
      if (result && result.error_code)
        throw new Error(result.error_code);
      res = [...res, ...result.trans_result];
    }
    return allTextKeys.map((key2) => {
      let find = res.find((v) => v.src === allText2[key2]);
      if (!find)
        find = { src: "", dst: "" };
      return [key2, find.dst];
    }).reduce((a, b) => {
      return { ...a, [b[0]]: b[1] };
    }, {});
  } catch (error) {
    console.log(error);
  }
};

// src/i18n/config.js
var config_exports = {};
__export(config_exports, {
  appid: () => appid,
  from: () => from,
  handlerResult: () => handlerResult,
  handlerTemlpate: () => handlerTemlpate,
  ignoreDirs: () => ignoreDirs,
  ignoreExts: () => ignoreExts,
  key: () => key,
  prefix: () => prefix,
  reg: () => reg,
  to: () => to
});
var appid = "";
var key = "";
var from = "cht";
var to = ["en", "zh"];
var ignoreDirs = [
  ".hbuilderx",
  "node_modules",
  "uni_modules",
  "unpackage",
  ".git",
  "dist",
  "static"
];
var ignoreExts = [".woff2", ".jpg", ".png", ".pdf", ".keystore"];
var reg = new RegExp(/\$t\(('|"|`)(.*?)('|"|`)\)/g);
var prefix = "i18n_";
var handlerResult = (allText2, nextKey2, [_, $1, $2, $3]) => {
  allText2[nextKey2] = $2;
  return allText2;
};
var handlerTemlpate = (allText2, nextKey2, [_, $1, $2, $3]) => {
  return `$t(${$1}${nextKey2}${$3})`;
};

// src/i18n/index.js
global.i18n = {};
global.i18n.config = config_exports;
async function i18n_default() {
  const root = process.cwd();
  global.i18n.cacheDir = resolve2(root, ".i18n");
  if (existsSync(resolve2(global.i18n.cacheDir, "config.js"))) {
    const config = __require(resolve2(global.i18n.cacheDir, "config.js"));
    global.i18n.config = config;
  }
  if (!existsSync(global.i18n.cacheDir))
    mkdirSync(global.i18n.cacheDir);
  const allText2 = handler_default(root);
  if (!global.i18n.config.translate)
    return;
  writeFileSync2(
    resolve2(global.i18n.cacheDir, `${global.i18n.config.from}.json`),
    JSON.stringify(allText2, null, 2)
  );
  global.i18n.config.to.forEach(async (toTranslate) => {
    const translateText = await translate(
      allText2,
      global.i18n.config.from,
      toTranslate
    );
    writeFileSync2(
      resolve2(global.i18n.cacheDir, `${toTranslate}.json`),
      JSON.stringify(translateText, null, 2)
    );
  });
}

// src/cli.ts
var cli = cac();
cli.command("i18n", "\u63D0\u53D6\u5F53\u524D\u9879\u76EE\u4E0B\u591A\u8BED\u8A00\u7684\u6587\u672C\uFF0C \u8FDB\u884C\u5904\u7406\u5E76\u7FFB\u8BD1").action(async () => {
  i18n_default();
});
cli.help();
cli.parse();
//# sourceMappingURL=index.mjs.map