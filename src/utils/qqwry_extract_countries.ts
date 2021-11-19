import loadCsv from './loadCsv'
import path from 'path'
import writeCsv from './writeCsv'
import config from '../config'

const { tempCsvName } = config.cncity

const outputFolderName = 'qqwry_all_countries.csv'

;(async () => {
  const dataPre = (
    await loadCsv(path.join('./', tempCsvName), ',', '', 'gb2312')
  ).map((line) => line.map((item) => item.replace(/(^"|"$)/g, '')))

  const a = dataPre
    .map(([_1, _2, _3, _4, text]) => text.match(/\[(.+?)[\s\]]/)?.[1])
    .filter((text) => {
      if (!text) {
        return false
      }
      const last = text.charAt(text.length - 1)
      return (
        last !== '市' &&
        last !== '省' &&
        last !== '县' &&
        last !== '区' &&
        last !== '盟' &&
        last !== '镇' &&
        last !== '乡' &&
        last !== '旗' &&
        last !== '州' &&
        last !== '部' &&
        last !== '院' &&
        last !== '栋' &&
        last !== '幢' &&
        last !== '街' &&
        last !== '学' &&
        last !== '城' &&
        last !== '寓' &&
        last !== '舍' &&
        last !== '路' &&
        last !== '吧'
      )
    })

  const b = [...new Set(a)]

  writeCsv(
    b.map((item) => [item]),
    path.join('./', outputFolderName),
    ',',
    false,
  )
})()
