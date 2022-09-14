import { importLangFiles } from "../../utils/importModulesFiles";

const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = importLangFiles(modulesFiles, "_en");

const obj = {
  ...modules,
  lang_code: "en",
  lang_name: "English",
  hello_world: "Hello World",
};
export default obj;
