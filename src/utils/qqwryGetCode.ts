import loadCsv from './loadCsv'
import path from 'path'

const qqwryGCInit = async () => {
  const qqwryMap = await loadCsv(
    path.join(__dirname, `../../country_codes/qqwry/qqwry.csv`),
    '\t',
  )

  const qqwryObj: Record<string, string> = {}

  qqwryMap
    .map((line) => (line.length < 3 ? line.concat(line[1]) : line))
    .map(([code, zhcn, ...rest]) => [code, ...rest])
    .forEach(([code, ...rest]) => {
      rest.forEach((name) => {
        if (name !== '') {
          qqwryObj[name] = code
        }
      })
    })

  const regex = new RegExp(
    `^(${Object.keys(qqwryObj)
      .sort((a, b) => b.length - a.length)
      .join('|')})`,
    'g',
  )

  const ret = {
    qqwryObj,
    regex,
    getData: (str: string) => {
      const matched = str.match(regex)?.[0] ?? ''
      const nonCountryPart = str.replace(regex, '')
      const code = str ? (matched ? qqwryObj[matched] : 'CN') : ''
      return {
        countryPart: matched,
        nonCountryPart,
        code,
      }
    },
  }

  return ret
}

export default qqwryGCInit
