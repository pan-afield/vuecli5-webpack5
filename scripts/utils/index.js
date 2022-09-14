const path = require('path')

const i18nRe = /\$t\(('|")([^'"]+)\1\)/g

const srcDir = path.resolve(__dirname, '../../src')

const isUndef = val => val === undefined

const isObject = val => typeof val === 'object'

function getValByPath(key, source, defaultVal) {
    const arr = key.split('.')
    let tempObj = source[stripBOM(arr.shift())]
    while (arr.length) {
        if (!tempObj) break
        tempObj = tempObj[stripBOM(arr.shift())]
    }
    return isUndef(tempObj) ? defaultVal : tempObj
}

function stripBOM(content) {
    // 检测第一个字符是否为BOM   
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1)
    }
    return content
}

function escapeSpecialCharacter(str) {
    const pattern = /[\^.\-\+\\\$\(\)\*\[\]\?\{\}\|\?]/g
    return str.replace(pattern, match => '\\' + match)
}

module.exports = {
    i18nRe,
    srcDir,
    getValByPath,
    stripBOM,
    isObject,
    escapeSpecialCharacter
}
