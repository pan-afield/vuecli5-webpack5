const fs = require('fs')
const path = require('path')
const { srcDir, i18nRe, isObject, escapeSpecialCharacter } = require('../utils')
const { translateDataMap, TARGET_FILES } = require('../utils/translateData')

const translatedData = ((source) => {
    const map = {}
    const fn = (val, preKey) => {
        if (isObject(val)) {
            Object.keys(val).forEach(key => fn(val[key], `${preKey}.${key}`))
        } else {
            map[val] = preKey
        }
    }
    Object.keys(source).forEach(key => fn(translateDataMap[key], key))
    return map
})(translateDataMap)

TARGET_FILES.forEach(file => {
    let content = fs.readFileSync(path.resolve(srcDir, file), 'utf-8')
    const translateContent = content.match(i18nRe) || []
    let isReplaced = false
    translateContent.forEach(item => {
        let copywriting = item.replace(i18nRe, '$2')
        const hasChinese = /[\u4e00-\u9fa5]+/g.test(translateContent)
        const key = translatedData[copywriting]
        if (hasChinese && key) {
            copywriting = escapeSpecialCharacter(copywriting)
            const re = `(\\$t\\(('|"))${copywriting}(\\2\\))`
            content = content.replace(new RegExp(re), `$1${key}$3`)
            isReplaced = true
        }
    })
    isReplaced && fs.writeFileSync(path.resolve(srcDir, file), content)
})
