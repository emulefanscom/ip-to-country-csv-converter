import loadCsv from './utils/loadCsv'
import loadCountryI18n from './utils/loadCountryI18n'
import fs from 'fs'
import path from 'path'
import writeCsv from './utils/writeCsv'
import langs from './langs'
import config from './config'
import s2t from './utils/zhconvert/s2t'
import qqwryGCInit from './utils/qqwryGetCode'

const { finalCsvName } = config
const { lang, tempCsvName, outputFolderName, useUtf8, merge, mergeNotAddCn } =
  config.cncity

;(async () => {
  fs.rmSync(path.join('./', outputFolderName, lang), {
    recursive: true,
    force: true,
  })

  const { getData } = await qqwryGCInit()

  const data = (
    await loadCsv(path.join('./', tempCsvName), ',', '', 'gb2312')
  ).map((line) => line.map((item) => item.replace(/(^"|"$)/g, '')))

  const codeLocals = await loadCountryI18n(lang)

  const newData = data.map(([ipFrom, ipTo, code2L, code3L, detail]) => {
    const inBracket = detail.match(/\[(.*)\]/)?.[1] ?? ''

    let newDetail: string

    if (inBracket === '') {
      newDetail = codeLocals[code2L]
    } else {
      if (merge) {
        const qqwryData = getData(inBracket)
        const { code } = qqwryData
        if (code === '') {
          throw Error('Unknown country in QQWry data')
        }

        if (code !== code2L) {
          newDetail = codeLocals[code2L]
        } else {
          const nm =
            mergeNotAddCn && code2L === 'CN' && qqwryData.nonCountryPart !== ''
              ? ''
              : codeLocals[code2L]
          newDetail = `${nm}${qqwryData.nonCountryPart
            .replace(/ /, '')
            .replace(/^特别行政区$/, '') // redundant
            .replace(/^特別行政区$/, '')}`
        }
      } else {
        newDetail = `${codeLocals[code2L]}[${inBracket.replace(/ /, '')}]`
      }
    }

    return [ipFrom, ipTo, code2L, code3L, newDetail]
  })

  const retData: string[][] =
    lang === 'zh-TW' ||
    lang === 'zh-HK' ||
    lang === 'zh-MO' ||
    lang === 'zh-Hant'
      ? JSON.parse(s2t(JSON.stringify(newData)))
      : newData

  await writeCsv(
    retData,
    path.join('./', outputFolderName, lang, finalCsvName),
    ',',
    true,
    useUtf8 || !(lang in langs) ? 'utf8' : langs[lang],
  )
})()
