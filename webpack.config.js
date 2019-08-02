// const path = require('path')
// const fs = require('fs')

// var nodeModules = {}
// fs.readdirSync(path.resolve(__dirname, 'node_modules'))
//   .filter(x => ['.bin'].indexOf(x) === -1)
//   .forEach(mod => { nodeModules[mod] = `commonjs ${mod}` })

// module.exports = {
//   externals: {
//     electron: "require('electron')",
//     child_process: "require('child_process')",
//     fs: "require('fs')",
//     path: "require('path')",
//     target: 'node-webki',
//     fs: 'commonjs fs',
//     path: 'commonjs path',
//     nodeModules
//   }
// }
