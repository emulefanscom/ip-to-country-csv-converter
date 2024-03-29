# eMule format ip-to-country.csv converter

The scripts here can convert free IP location databases to eMule format **ip-to-country.csv**.

The IP location databases in [sapics/ip-location-db](https://github.com/sapics/ip-location-db#readme) are recommended. By default we use [DB-IP](https://db-ip.com/)'s normal (country)-level and city-level databases, which are released under [CC-BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).

We periodically run the script and generate **ip-to-country.csv** in these languages:

- Country-level ip2c: English (`en`), Mainland China Simplified Chinese International Version (`zh-CN`), Mainland China Simplified Chinese China Version (`zh-CN_china`), Taiwan Traditional Chinese (`zh-TW`), Hong Kong Traditional Chinese (`zh-HK`), Singapore Simplified Chinese (`zh-SG`), French (`fr`), German (`de`), Spanish (`es`), Russian (`ru`), Japanese (`ja`), Brazilian Portuguese (`pt-BR`).
- City-level ip2c: English (`en`).
- CN City ip2c: Mainland China Simplified Chinese (`zh-CN`), Taiwan Traditional Chinese (`zh-TW`).

If you want to download the generated files, please see the table in the [**README of emulefanscom/ip2c repo**](https://github.com/emulefanscom/ip2c#readme), or read the [**Chinese articles on our eMuleFans.com 电骡爱好者 blog**](https://www.emulefans.com/news/plugin/ip-to-country/).

The TypeScript / JavaScript code in this repo is MIT-licensed.

## Installation

Install [Node.js](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) first. Then clone or download the repo and install dependencies:

```
yarn
```

## Country-level ip2c

Get all available languages' country-level **ip-to-country.csv** files:

```
yarn docountry
```

The files will be generated in their **./output/\<LANGUAGE\>** folders.

## City-level ip2c

Get city-level **ip-to-country.csv** file:

```
yarn docity
```

The file will be generated in their **/output_city/en** folder.

You can change the language in [**./src/config.ts**](https://github.com/emulefanscom/ip-to-country-csv-converter/blob/main/src/config.ts) file (`config.city.lang`), the script will only localize the country name. But for now, it's not recommended to use any non-English language for city-level ip2c, because the scripts ensure everything from the DB-IP's city version database is properly converted into basic letters or ASCII characters in the English conversion, but not for the other languages.

## CN City ip2c

You can use QQWry's IP location database (QQ 纯真版 IP 数据库) to extend the country-level ip2c and get a **ip-to-country.csv** file with detailed Chinese IP location data.

Download [i2chan](https://github.com/emulefanscom/misc/releases/download/i2chan/i2chan.7z), an old tool written by "zhangshaox" which can merge a country-level **ip-to-country.csv** with QQWry's database. Unzip it.

Download QQWry's database from [their official website](https://www.cz88.net/), get **qqwry.dat** file.

You have already generated the country-level **ip-to-country.csv** file in English with `yarn docountry`.

Open **i2chan.exe**, click "浏览" buttons to select the locations of your **ip-to-country.csv** file and **qqwry.dat** file. Click "扩展全部" and all checkboxes will be checked. Click "开始". Wait for a few minutes.

A new **ip-to-country.csv** is generated, the backup of your old file is **ip-to-country.csv.bak**.

Move **ip-to-country.csv** into `ip-to-country-csv-converter`'s root folder and rename the file to "**ip-to-country.cncity.temp.csv**".

Run:

```
yarn docncity
```

And you will find your Simplified Chinese **ip-to-country.csv** in **./output_cncity/zh-CN** folder.

You can change `config.cncity.lang` from `zh-CN` to `zh-TW`, `zh-HK` or `zh-CN_china`, `zh-SG`, as well as other options in [**./src/config.ts**](https://github.com/emulefanscom/ip-to-country-csv-converter/blob/main/src/config.ts) file, and re-run `yarn docncity`.

You can also use a non-Chinese language here.

## Encoding

All generated **ip-to-country.csv** files use their traditional local encoding (see [**./src/langs.ts**](https://github.com/emulefanscom/ip-to-country-csv-converter/blob/main/src/langs.ts)), if you want to use `UTF-8`, change `config.country.useUtf8` / `config.city.useUtf8` / `config.cncity.useUtf8` in [**./src/config.ts**](https://github.com/emulefanscom/ip-to-country-csv-converter/blob/main/src/config.ts).

It's possible some Chinese characters are outside `gb2312` / `big5`, obviously, `gbk`, `gb18030` and `big5hkscs` will be used to encode these characters.

## Compression

Run `yarn zip` to zip all existant **./output\*/\<LANGUAGE\>/ip-to-country.csv** files, the zip file's name will be:

- Country-level: `ip-to-country_csv.en.zip`, `ip-to-country_csv.zh-CN.zip` (always show the lang code)
- City-level: `ip-to-country_csv.city.zip` (if no lang code, it's `en`) / `ip-to-country_csv.city.fr.zip`
- CN City: `ip-to-country_csv.cncity.zip` (if no lang code, it's `zh-CN`) / `ip-to-country_csv.cncity.zh-TW.zip`

Run `yarn rmzip` to delete all **./output\*/\*\*/\*.zip**

## Translation

The translation data in **./country_codes/\<LANGUAGECODE\>.cvs** files are based on local language versions of [Wikipedia](https://www.wikipedia.org/), and GeoLite2 Country translations of [MaxMind](https://www.maxmind.com/), except for the Mainland China Simplified Chinese China Version (`zh-CN_china`) which is based on the articles from official websites of [Ministry of Foreign Affairs of the People's Republic of China](https://www.fmprc.gov.cn/web/gjhdq_676201/) and other official department of P. R. China.
