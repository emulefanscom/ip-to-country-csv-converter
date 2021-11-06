import loadCsv from './loadCsv'
import loadCountryI18n from './loadCountryI18n'
import path from 'path'
import writeCsv from './writeCsv'
import download from './download'
import urls from './urls'

const tempCsvName = 'ip-to-country.temp.csv'
const finalCsvName = 'ip-to-country.csv'

const lang = 'zh-CN'

// download(urls.geofeed_whois_asn.url.ipv4_num, tempCsvName)
// download(urls.db_ip_lite_city.url.ipv4_num, tempCsvName, true)

/**
 * emulefans.com uses:
 * urls.geofeed_whois_asn.url.ipv4_num for normal (country) version
 * urls.db_ip_lite_city.url.ipv4_num for city version
 */

;(async () => {
  await download(urls.geofeed_whois_asn.url.ipv4_num, tempCsvName)
  const data = await loadCsv(path.join('./', tempCsvName))
  const code3Ls = await loadCountryI18n('3-letter')
  const codeLocals = await loadCountryI18n(lang)
  const newData = data.map(([ipFrom, ipTo, code2L]) => {
    if (!(code2L in code3Ls)) {
      console.error(`${code2L} not in 3 letter codes`)
    }
    if (!(code2L in codeLocals)) {
      console.error(`${code2L} not in local translation`)
    }
    return [ipFrom, ipTo, code2L, code3Ls[code2L], codeLocals[code2L]]
  })
  await writeCsv(newData, path.join('./', finalCsvName))
})()
