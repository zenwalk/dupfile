
const path = require('path')
const fs = require('fs').promises

// function walk2(dir, callback) {
// 	let files = fs.readdirSync(dir)
// 	files.forEach(function (file) {
// 		let filepath = path.join(dir, file)
// 		let statsObj = fs.statSync(filepath)
// 		if (statsObj.isFile()) {
// 			callback(file)
// 		}
// 		if (statsObj.isDirectory()) {
// 			walk(file, callback)
// 		}
// 	})
// }

async function walk(dir, recursive = false) {
  let files = await fs.readdir(dir)
  files = await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file)
    const stats = await fs.stat(filePath)
    if (recursive && stats.isDirectory()) return walk(filePath, recursive)
    if (stats.isFile()) return filePath
    return undefined
  }))

  return files.reduce((all, folderContents) => all.concat(folderContents), []).filter(Boolean)
}

module.exports = walk
