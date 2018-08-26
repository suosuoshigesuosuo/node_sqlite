### 安装
这个demo是用来熟悉sqlite3这个插件的，所以没有做太多处理。

因为项目有需要需要使用ffi调用动态库，而node-gyp和ffi等插件需要编译安装，对环境依赖较高，所以将node_module一同打包进去，
其中ffi、ref-array等环境是在CentOS7.5环境中安装，所以如果要使用sqlite3demo演示的话，需要重新
`npm install sqlite3`

