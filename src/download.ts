import https from 'https'
import fs from 'fs'
import zlib from 'zlib'

const download = (url: string, dest: string, gzip: boolean = false) =>
  new Promise<void>((resolve, reject) => {
    fs.unlink(dest, (err) => {
      if (err && err.code == 'ENOENT') {
        // console.info("File doesn't exist, won't remove it.")
      } else if (err) {
        console.error('Error occurred while trying to remove file')
      } else {
        // console.info(`removed`)
      }
    })

    const file = fs.createWriteStream(dest, { flags: 'wx' })

    const request = https.get(url, (response) => {
      if (response.statusCode === 200) {
        ;(gzip ? response.pipe(zlib.createGunzip()) : response).pipe(file)
      } else {
        file.close()
        fs.unlink(dest, () => {})
        reject(
          `Server responded with ${response.statusCode}: ${response.statusMessage}`,
        )
      }
    })

    request.on('error', (err) => {
      file.close()
      fs.unlink(dest, () => {})
      reject(err.message)
    })

    file.on('finish', () => {
      resolve()
    })

    file.on('error', (err) => {
      file.close()

      fs.unlink(dest, () => {})
      reject(err.message)
    })
  })

export default download
