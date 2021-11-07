import loadCsv from './utils/loadCsv'
import loadCountryI18n from './utils/loadCountryI18n'
import fs from 'fs'
import path from 'path'
import writeCsv from './utils/writeCsv'
import download from './utils/download'
import urls from './urls'
import langs from './langs'
import config from './config'

const { finalCsvName } = config
const { tempCsvName, lang, outputFolderName, useUtf8, normalizeEnglish } =
  config.city

/**
 * emulefans.com uses:
 * urls.db_ip_lite.url.ipv4_num (CC BY 4.0 by DB-IP) for normal (country) version
 * urls.db_ip_lite_city.url.ipv4_num (CC BY 4.0 by DB-IP) for city version
 */
;(async () => {
  fs.rmSync(path.join('./', outputFolderName, lang), {
    recursive: true,
    force: true,
  })
  const pathTemp = path.join('./', tempCsvName)
  if (fs.existsSync(pathTemp)) {
    fs.unlinkSync(pathTemp)
  }

  await download(urls.db_ip_lite_city.url.ipv4_num, tempCsvName, true)

  const data = await loadCsv(path.join('./', tempCsvName), ',', '"')
  const code3Ls = await loadCountryI18n('3-letter')

  const codeLocals = await loadCountryI18n(lang)
  const newData = data.map(([ipFrom, ipTo, code2L, loc1, loc2, loc3]) => {
    if (!(code2L in code3Ls)) {
      console.error(`${code2L} not in 3 letter codes`)
    }
    if (!(code2L in codeLocals)) {
      console.error(`${code2L} not in local translation`)
    }

    let localStr = [loc3, loc2, loc1, codeLocals[code2L]]
      .filter((n) => n)
      .join(', ')
    if (lang === 'en' && normalizeEnglish) {
      localStr = localStr
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[ʻ‘’ʼ”]/g, "'")
        .replace(/[—–_]/g, '-')
        .replace(/[\u064D\u0650]/g, '')
        .replace(/室蘭/g, 'Muroran')
        .replace(/东涌/g, 'Tung Chung')
        .replace(/昂坪/g, 'Ngong Ping')
        .replace(/ə/g, 'e')
        .replace(/ª/g, 'a')
        .replace(/Ј/g, 'J')
        .replace(/\\/g, ' ')
        .replace(/Najaru قرية نجرو/g, 'Najaru Negro Village')
      if (!/^[A-Za-z0-9 ,-/(/)'&:\]\[#@]+$/.test(localStr)) {
        console.error(`${localStr} is not a valid English string`)
      }
    }
    return [ipFrom, ipTo, code2L, code3Ls[code2L], localStr]
  })
  await writeCsv(
    newData,
    path.join('./', outputFolderName, lang, finalCsvName),
    ',',
    useUtf8 || !(lang in langs) ? 'utf8' : langs[lang],
  )
})()
