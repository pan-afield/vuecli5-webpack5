// 例子
// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)
// const modules = modulesFilesImport(modulesFiles)
// const modules = modulesFilesImport(modulesFiles, function (moduleName, value) {
//     console.log(moduleName)
//     console.log(value)
//     return true
// })

// 你不需要 `import app from './modules/app'`
// 它将自动要求模块文件中的所有vuex模块

// 动态加载vux模块
function importVuxFiles(modulesFiles, call) {
  return modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;

    if (call === undefined || call(moduleName, value)) {
      return modules;
    }
  }, {});
}

// 动态加载语言模块
function importLangFiles(modulesFiles, key) {
  return modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);

    if (moduleName.indexOf(key) > -1) {
      const moduleKey = moduleName.replace(key, "");
      modules[moduleKey] = value.default[moduleKey];

      return modules;
    } else {
      return modules;
    }
  }, {});
}
export { importLangFiles, importVuxFiles };
