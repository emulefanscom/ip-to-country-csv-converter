import parse from 'csv-parse'
import fs from 'fs'

const loadCsv = (
  filepath: string,
  delimiter: string = ',',
  quote: string = '',
): Promise<string[][]> =>
  new Promise((resolve, reject) => {
    const csvData: any[] = []
    fs.createReadStream(filepath)
      .pipe(
        parse({
          relax_column_count: true,
          delimiter,
          quote,
          trim: true,
        }),
      )
      .on('data', (csvrow) => {
        csvData.push(csvrow)
      })
      .on('end', () => {
        resolve(csvData)
      })
  })

export default loadCsv
