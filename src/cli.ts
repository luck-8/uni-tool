import cac from "cac";
import handler from "./i18n";

const cli = cac();
// 提取需要翻译的文本， 并修改代码
cli
  .command("i18n", "提取当前项目下多语言的文本， 进行处理并翻译")
  // .option("-d, --delete", "清除翻译缓存")
  // .option("translate <from> <to>", "针对已解析出的缓存文件翻译出另外的语言")
  .option("back", "回退代码")
  .action(async ({ back }) => {
    global.i18n.back = back;
    handler();
  });

cli.help();
cli.parse();
// 已经npm link了， 可以全局实用 uni-tool
