import stringify from 'csv-stringify'
import fs from 'fs'
import iconv from 'iconv-lite'
import path from 'path'
import stream from 'stream'

const writeCsv = <T>(
  twoDArr: T[][],
  filepath: string,
  delimiter: string = ',',
  encoding: string = 'utf8',
  eol: string = '\r\n',
): Promise<string> =>
  new Promise((resolve, reject) => {
    stringify(
      twoDArr,
      {
        delimiter,
      },
      (err, output) => {
        if (err) {
          reject(err)
        }

        const outputEncoded = iconv.encode(
          output.replace(/(\r\n|\n)/g, eol),
          encoding,
        )

        const dir = path.dirname(filepath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }

        const readStream = new stream.PassThrough()
        const writeStream = fs.createWriteStream(filepath)

        readStream.once('error', (err) => {
          reject(err)
        })

        readStream.once('end', () => {
          resolve(output)
        })

        readStream.end(outputEncoded)
        readStream.pipe(writeStream)
      },
    )
  })

export default writeCsv
