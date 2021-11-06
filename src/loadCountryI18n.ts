import path from 'path'
import loadCsv from './loadCsv'
import langs from './langs'

const loadCountryI18n = async (
  lang: string,
): Promise<Record<string, string>> => {
  if (!(lang in langs) && lang !== '3-letter') {
    throw new Error('Language does not exist!')
  }
  return Object.fromEntries(
    await loadCsv(path.join(__dirname, `../country_codes/${lang}.csv`), '\t'),
  )
}

export default loadCountryI18n
