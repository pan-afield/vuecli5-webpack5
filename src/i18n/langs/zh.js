import { importLangFiles } from "../../utils/importModulesFiles";

const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = importLangFiles(modulesFiles, "_zh");

const obj = {
  ...modules,
  lang_code: "zh",
  lang_name: "中文",
  hello_world: "世界你好！",
};
export default obj;
