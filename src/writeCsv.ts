import stringify from 'csv-stringify'
import fs from 'fs'

const writeCsv = <T>(
  twoDArr: T[][],
  filepath: string,
  delimiter: string = ',',
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
        fs.writeFile(filepath, output, (err) => {
          if (err) {
            reject(err)
          }
          resolve(output)
        })
      },
    )
  })

export default writeCsv
