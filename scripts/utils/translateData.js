const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { srcDir } = require('./index')

const CHECK_DIR = ['views', 'mixins', 'components']

const TARGET_FILES = glob.sync(`@(${CHECK_DIR.join('|')})/**/*.@(js|vue)`, { cwd: srcDir })

const translateDataMap = {}
const translateFiles = glob.sync(`i18n/langs/modules/**/*@(_en).js`, { cwd: srcDir })
const TEMP_FILE = path.resolve(srcDir, 'i18n/langs/modules/TEMP.js')

translateFiles.forEach(async file => {
    const filePath = path.resolve(srcDir, file)
    let content = fs.readFileSync(filePath, 'utf-8')
    content = content.replace('export default', 'module.exports = ')
    try {
        fs.writeFileSync(TEMP_FILE, content)
    } catch (err) {
        console.log(err)
    }
    delete require.cache[TEMP_FILE]
    const data = require(TEMP_FILE)
    Object.assign(translateDataMap, data)
})

fs.unlink(TEMP_FILE, err => err && console.log(`TEMP File deletion failed: ${err}`))

module.exports = {
    TARGET_FILES,
    translateDataMap
}
