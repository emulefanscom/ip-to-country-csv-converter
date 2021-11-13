import loadCsv from './utils/loadCsv'
import writeCsv from './utils/writeCsv'
import path from 'path'
import fs from 'fs'

const sortAlphabetically = async (lang: string) => {
  const filepath = path.join(__dirname, `../country_codes/${lang}.csv`)
  const data = await loadCsv(filepath, '\t')
  data.sort((a, b) => a[0].localeCompare(b[0]))
  await writeCsv(data, filepath, '\t', false, 'utf8', '\n')
}

// byLang file cannot have duplicates
const sortByOrderInFile = async (lang: string, byLang: string) => {
  const data = await loadCsv(
    path.join(__dirname, `../country_codes/${lang}.csv`),
    '\t',
  )
  const order = (
    await loadCsv(path.join(__dirname, `../country_codes/${byLang}.csv`), '\t')
  ).map((e) => e[0])
  data.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
  await writeCsv(
    data,
    path.join(__dirname, `../country_codes/${lang}.csv`),
    '\t',
    false,
    'utf8',
    '\n',
  )
}

const getAllFiles = async (dir: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files.map((file) => path.join(dir, file)))
    })
  })
}

;(async () => {
  // await sortAlphabetically('en')

  // await sortByOrderInFile('en', '3-letter')

  // const p = path.join(__dirname, `../country_codes`)
  // const files = await getAllFiles(p)
  // files.forEach(async (file) => {
  //   // await sortAlphabetically(file)
  //   if (path.basename(file) !== '3-letter.csv') {
  //     await sortByOrderInFile(file, '3-letter')
  //   }
  // })
})()
