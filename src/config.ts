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
    lang: 'zh-CN',
    tempCsvName: 'ip-to-country.cncity.temp.csv',
    outputFolderName: 'output_cncity',
    useUtf8: false,
  },
}

export default config
