const config = {
  /**
   * GLOBAL SETTINGS
   */
  finalCsvName: 'ip-to-country.csv',

  country: {
    /**
     * COUNTRY SETTINGS
     */
    tempCsvName: 'ip-to-country.temp.csv',
    outputFolderName: 'output',

    useUtf8: false,
    // otherwise use traditional local encoding

    normalizeEnglish: true,
    // (normalizeEnglish: remove diacritics for English)
  },

  city: {
    /**
     * CITY SETTINGS
     */
    lang: 'en',
    tempCsvName: 'ip-to-country.city.temp.csv',
    outputFolderName: 'output_city',
    useUtf8: false,
    normalizeEnglish: true,
  },

  cncity: {
    /**
     * CNCITY SETTINGS
     */
    lang: 'zh-CN', // should usually be 'zh-*'
    tempCsvName: 'ip-to-country.cncity.temp.csv',
    outputFolderName: 'output_cncity',
    useUtf8: false,
    merge: true,
    mergeNotAddCn: true, // when `merge` is `true`, just Chinese province/city such as '上海市静安区' will suffice, no need to add '中国'
  },
}

export default config
