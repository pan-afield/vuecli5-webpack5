const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const config = require('../../devLocal.json')

if (!config.tag) throw Error('请在根目录 devLocal.json 文件中设置 tag 属性')

const currentVersion = config.tag

execSync(`git tag ${currentVersion}`)
execSync(`git push origin ${currentVersion}`)

config.tag = currentVersion.replace(/\d+$/, n => +n + 1)

fs.writeFileSync(path.join(__dirname, '../../devLocal.json'), JSON.stringify(config, null, 2))

console.log(`提测tag: \x1b[33m${currentVersion}\x1B[0m`)
