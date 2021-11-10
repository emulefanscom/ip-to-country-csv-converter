import loadCsv from './utils/loadCsv'
import loadCountryI18n from './utils/loadCountryI18n'
import fs from 'fs'
import path from 'path'
import writeCsv from './utils/writeCsv'
import langs from './langs'
import config from './config'
import s2t from './utils/zhconvert/s2t'

const { finalCsvName } = config
const { lang, tempCsvName, outputFolderName, useUtf8 } = config.cncity

;(async () => {
  fs.rmSync(path.join('./', outputFolderName, lang), {
    recursive: true,
    force: true,
  })

  const data = (
    await loadCsv(path.join('./', tempCsvName), ',', '', 'gb2312')
  ).map((line) => line.map((item) => item.replace(/(^"|"$)/g, '')))

  const codeZhCns = await loadCountryI18n('zh-CN')
  const codeLocals = await loadCountryI18n(lang)
  const newData = data.map(([ipFrom, ipTo, code2L, code3L, detail]) => {
    const zhCnName = codeZhCns[code2L]
    const localName = codeLocals[code2L]
    const temp = detail.match(/\[.*?\]/)
    let tempStr = temp ? temp[0] : ''
    if (lang !== 'zh-CN' && lang.substring(0, 3) === 'zh-') {
      tempStr = tempStr.replace(zhCnName, localName) // replace only first instance
      if (
        lang === 'zh-TW' ||
        lang === 'zh-HK' ||
        lang === 'zh-MO' ||
        lang === 'zh-Hant'
      ) {
        tempStr = s2t(tempStr)
      }
    }
    const newDetail = `${codeLocals[code2L]}${tempStr}`
    return [ipFrom, ipTo, code2L, code3L, newDetail]
  })
  await writeCsv(
    newData,
    path.join('./', outputFolderName, lang, finalCsvName),
    ',',
    true,
    useUtf8 || !(lang in langs) ? 'utf8' : langs[lang],
  )
})()
