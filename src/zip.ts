import fs from 'fs'
import path from 'path'
import archiver from 'archiver'
import langs from './langs'
import config from './config'

const { finalCsvName } = config

const zipSingleFileInSameDir = (filePath: string, zipName?: string) => {
  const output = fs.createWriteStream(
    (zipName ? path.join(path.dirname(filePath), zipName) : filePath) + '.zip',
  )
  const archive = archiver('zip', {
    zlib: { level: 9 },
  })

  output.on('close', () => {
    console.log(archive.pointer() + ' total bytes')
    console.log(
      'archiver has been finalized and the output file descriptor has closed.',
    )
  })

  output.on('end', () => {
    console.log('Data has been drained')
  })

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
    } else {
      throw err
    }
  })

  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)

  archive.append(fs.createReadStream(filePath), {
    name: path.basename(filePath),
  })

  archive.finalize()
}

;['output', 'output_city', 'output_cncity'].forEach((outputFolder) => {
  Object.keys(langs).forEach((lang) => {
    const pathTemp = path.join(
      __dirname,
      '..',
      outputFolder,
      lang,
      finalCsvName,
    )
    if (fs.existsSync(pathTemp)) {
      let zipname = 'ip-to-country_csv'
      if (outputFolder === 'output_city') {
        zipname += '.city'
      } else if (outputFolder === 'output_cncity') {
        zipname += '.cncity'
      }
      if (
        !(
          (outputFolder === 'output_cncity' && lang === 'zh-CN') ||
          (outputFolder === 'output_city' && lang === 'en')
        )
      ) {
        zipname += '.' + lang
      }
      zipSingleFileInSameDir(pathTemp, zipname)
    }
  })
})
