
const path = require('path')
const fs = require('fs')
const { srcDir, i18nRe, getValByPath } = require('../utils')
const { translateDataMap, TARGET_FILES } = require('../utils/translateData')

const result = {}

TARGET_FILES.forEach(file => {
    const content = fs.readFileSync(path.resolve(srcDir, file), 'utf-8')
    let translateContent = content.match(i18nRe) || []
    translateContent = translateContent.map(item => item.replace(i18nRe, '$2'))
    const notTranslateKeyArr = translateContent.filter(key => !getValByPath(key, translateDataMap))
    if (notTranslateKeyArr.length) result[file] = notTranslateKeyArr.join('\n')
})

const keys = Object.keys(result)

if (keys.length) {
    console.warn(`\x1b[1;33m存在未翻译的文案, 请及时替换 👇👇👇 !\x1B[0m\n`)
    keys.forEach(key => console.warn(`\x1b[33m${key}:\x1B[0m`, `\n${result[key]}`))
    process.exit()
}

