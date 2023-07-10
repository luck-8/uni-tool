var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key2 of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key2) && key2 !== except)
        __defProp(to2, key2, { get: () => from2[key2], enumerable: !(desc = __getOwnPropDesc(from2, key2)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli.ts
var import_cac = __toESM(require("cac"), 1);

// src/i18n/index.js
var import_path2 = require("path");
var import_fs2 = require("fs");

// src/i18n/handler.js
var import_path = require("path");
var import_fs = require("fs");
var import_magic_string = __toESM(require("magic-string"), 1);
var i18nIndex = 0;
function nextKey() {
  ++i18nIndex;
  return `${global.i18n.config.prefix}${i18nIndex}`;
}
var allText = {};
var deepRead = (root) => {
  let dirs = (0, import_fs.readdirSync)(root);
  dirs = dirs.filter((dir) => !global.i18n.config.ignoreDirs.includes(dir));
  dirs.forEach((dirPath) => {
    const fullPath = (0, import_path.resolve)(root, dirPath);
    const fileStat = (0, import_fs.statSync)(fullPath);
    if (fileStat.isDirectory()) {
      deepRead((0, import_path.resolve)(root, dirPath));
    } else {
      const file = (0, import_fs.readFileSync)(fullPath, "utf-8");
      if (global.i18n.config.ignoreExts.includes((0, import_path.extname)(fullPath || "")))
        return;
      const fileString = new import_magic_string.default(file);
      fileString.replace(global.i18n.config.reg, (...args) => {
        const key2 = nextKey();
        allText = global.i18n.config.handlerResult(allText, key2, args);
        if (global.i18n.back) {
          return global.i18n.config.backHandler(allText, key2, args);
        }
        return global.i18n.config.handlerTemlpate(allText, key2, args);
      });
      (0, import_fs.writeFileSync)(fullPath, fileString.toString());
    }
  });
};
function handler_default(root) {
  deepRead(root);
  return allText;
}

// src/i18n/baidu.js
var import_md5 = __toESM(require("md5"), 1);
var import_axios = __toESM(require("axios"), 1);
var import_ora = __toESM(require("ora"), 1);
var timeout = (time = 2e3) => {
  return new Promise((resolve3, reject) => {
    setTimeout(() => {
      resolve3();
    }, time);
  });
};
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
  return allText2;
};
var translate = async (allText2, from2, to2) => {
  try {
    const allTextValues = Object.values(allText2);
    const allTextKeys = Object.keys(allText2);
    const chankValues = queryHandler(allTextValues);
    const chankKeys = queryHandler(allTextKeys);
    const querys = chankValues.map((v) => v.join("\n"));
    let res = [];
    for (let i = 0; i < querys.length; i++) {
      await timeout();
    }
    return res.reduce((a, b) => ({ ...a, [b.key]: b.item.dst }), {});
  } catch (error) {
    console.log(error);
  }
};

// src/i18n/config.js
var config_exports = {};
__export(config_exports, {
  appid: () => appid,
  backHandler: () => backHandler,
  from: () => from,
  getCacheFromJson: () => getCacheFromJson,
  handlerResult: () => handlerResult,
  handlerTemlpate: () => handlerTemlpate,
  ignoreDirs: () => ignoreDirs,
  ignoreExts: () => ignoreExts,
  key: () => key,
  prefix: () => prefix,
  reg: () => reg,
  to: () => to
});
var fs = require("fs");
var path = require("path");
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
var json;
var getCacheFromJson = () => {
  if (json)
    return json;
  const jsonFile = fs.readFileSync(path.resolve(global.i18n.cacheDir, `./${global.i18n.cacheDir}.json`), "utf-8");
  json = JSON.parse(jsonFile);
  return json;
};
var backHandler = (allText2, nextKey2, [_, $1, $2, $3]) => {
  const json2 = getCacheFromJson();
  return `$t(${$1}${json2[nextKey2] ? json2[nextKey2] : ""}${$3})`;
};

// src/i18n/index.js
global.i18n = {};
global.i18n.config = config_exports;
async function i18n_default() {
  const root = process.cwd();
  global.i18n.cacheDir = (0, import_path2.resolve)(root, ".i18n");
  if ((0, import_fs2.existsSync)((0, import_path2.resolve)(global.i18n.cacheDir, "config.js"))) {
    const config = require((0, import_path2.resolve)(global.i18n.cacheDir, "config.js"));
    global.i18n.config = config;
  }
  if (!(0, import_fs2.existsSync)(global.i18n.cacheDir))
    (0, import_fs2.mkdirSync)(global.i18n.cacheDir);
  const allText2 = handler_default(root);
  if (global.i18n.back)
    return;
  (0, import_fs2.writeFileSync)(
    (0, import_path2.resolve)(global.i18n.cacheDir, `${global.i18n.config.from}.json`),
    JSON.stringify(allText2, null, 2)
  );
  let cacheTmpData = {};
  let cache = {};
  if ((0, import_fs2.existsSync)((0, import_path2.resolve)(global.i18n.cacheDir, "cache.json"))) {
    cache = require((0, import_path2.resolve)(global.i18n.cacheDir, "cache.json"));
  }
  cacheTmpData[global.i18n.config.from] = allText2;
  for (let toTranslate of global.i18n.config.to) {
    let finalTranslateText = [];
    let filterText = JSON.parse(JSON.stringify(allText2));
    if (cache) {
      const cacheKeys = Object.keys(cache);
      filterText = Object.keys(filterText).reduce((pre, cur) => {
        if (!cacheKeys.includes(filterText[cur]) || !cache[filterText[cur]][toTranslate]) {
          return { ...pre, [cur]: filterText[cur] };
        }
        finalTranslateText[cur] = cache[filterText[cur]][toTranslate];
        return pre;
      }, {});
    }
    console.log(filterText, "\u7FFB\u8BD1\u6570\u636E", toTranslate);
    const translateText = await translate(
      filterText,
      global.i18n.config.from,
      toTranslate
    );
    finalTranslateText = { ...finalTranslateText, ...translateText };
    finalTranslateText = Object.keys(finalTranslateText).sort(
      (pre, cur) => Number(pre.replace(global.i18n.config.prefix, "")) - Number(cur.replace(global.i18n.config.prefix, ""))
    ).reduce((pre, cur) => {
      return { ...pre, [cur]: finalTranslateText[cur] };
    }, {});
    (0, import_fs2.writeFileSync)(
      (0, import_path2.resolve)(global.i18n.cacheDir, `${toTranslate}.json`),
      JSON.stringify(finalTranslateText, null, 2)
    );
    cacheTmpData[toTranslate] = translateText;
  }
  const langs = Object.keys(cacheTmpData);
  const cacheRes = Object.keys(cacheTmpData[global.i18n.config.from]).reduce((a, b) => {
    let key2 = cacheTmpData[global.i18n.config.from][b];
    let item = langs.reduce((pre, cur) => {
      if (cacheTmpData[cur][b])
        return { ...pre, [cur]: cacheTmpData[cur][b] };
      return pre;
    }, {});
    if (a[key2]) {
      a[key2] = { ...a[key2], ...item };
    } else {
      a[key2] = item;
    }
    return a;
  }, cache);
  (0, import_fs2.writeFileSync)(
    (0, import_path2.resolve)(global.i18n.cacheDir, "cache.json"),
    JSON.stringify(cacheRes, null, 2)
  );
}

// src/cli.ts
var cli = (0, import_cac.default)();
cli.command("i18n", "\u63D0\u53D6\u5F53\u524D\u9879\u76EE\u4E0B\u591A\u8BED\u8A00\u7684\u6587\u672C\uFF0C \u8FDB\u884C\u5904\u7406\u5E76\u7FFB\u8BD1").option("back", "\u56DE\u9000\u4EE3\u7801").action(async ({ back }) => {
  global.i18n.back = back;
  i18n_default();
});
cli.help();
cli.parse();
//# sourceMappingURL=index.cjs.map