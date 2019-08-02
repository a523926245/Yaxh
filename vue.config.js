const path = require("path");
module.exports = {
 /**
  * lintOnSave:
  * Type: boolean | 'error'
  * Default: true
  * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  */
 lintOnSave:false,

 /**
  * productionSourceMap:
  * Type: boolean
  * Default: true
  * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  */
 productionSourceMap:false,

 /**
  * runtimeCompiler:
  * Type: boolean
  * Default: false
  * 否使用包含运行时编译器的 Vue 构建版本。
  * 设置为 true 后你就可以在 Vue 组件中使用 template 选项了
  * 但是这会让你的应用额外增加 10kb 左右。
  */
 runtimeCompiler:undefined,

 css: {
   modules: true
 },

 publicPath: undefined,
 outputDir: undefined,
 assetsDir: undefined,
 parallel: undefined,

 pluginOptions: {
   'style-resources-loader': {
     preProcessor: 'less',
     patterns: [
        path.resolve(__dirname, "./src/var.less")
     ]
   }
 }
}
