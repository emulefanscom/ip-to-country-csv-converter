const urls = {
  asn: {
    desc: 'ASN',
    type: 'country',
    license: 'CC0',
    update_freq: 'daily',
    url: {
      ipv4: 'https://cdn.jsdelivr.net/npm/@ip-location-db/asn-country/asn-country-ipv4.csv',
      ipv6: 'https://cdn.jsdelivr.net/npm/@ip-location-db/asn-country/asn-country-ipv6.csv',
      ipv4_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/asn-country/asn-country-ipv4-num.csv',
      ipv6_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/asn-country/asn-country-ipv6-num.csv',
    },
  },
  geofeed_asn: {
    desc: 'GeoFeed + ASN',
    type: 'country',
    license: 'CC0',
    update_freq: 'daily',
    url: {
      ipv4: 'https://cdn.jsdelivr.net/npm/@ip-location-db/geo-asn-country/geo-asn-country-ipv4.csv',
      ipv6: 'https://cdn.jsdelivr.net/npm/@ip-location-db/geo-asn-country/geo-asn-country-ipv6.csv',
      ipv4_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/geo-asn-country/geo-asn-country-ipv4-num.csv',
      ipv6_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/geo-asn-country/geo-asn-country-ipv6-num.csv',
    },
  },
  geofeed_whois_asn: {
    desc: 'GeoFeed + Whois + ASN',
    type: 'country',
    license: 'CC0',
    update_freq: 'daily',
    url: {
      ipv4: 'https://cdn.jsdelivr.net/npm/@ip-location-db/geo-whois-asn-country/geo-whois-asn-country-ipv4.csv',
      ipv6: 'https://cdn.jsdelivr.net/npm/@ip-location-db/geo-whois-asn-country/geo-whois-asn-country-ipv6.csv',
      ipv4_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/geo-whois-asn-country/geo-whois-asn-country-ipv4-num.csv',
      ipv6_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/geo-whois-asn-country/geo-whois-asn-country-ipv6-num.csv',
    },
  },
  iptoasn_com: {
    desc: 'iptoasn.com',
    type: 'country',
    license: 'PDDL by iptoasn.com',
    update_freq: 'daily',
    url: {
      ipv4: 'https://cdn.jsdelivr.net/npm/@ip-location-db/iptoasn-country/iptoasn-country-ipv4.csv',
      ipv6: 'https://cdn.jsdelivr.net/npm/@ip-location-db/iptoasn-country/iptoasn-country-ipv6.csv',
      ipv4_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/iptoasn-country/iptoasn-country-ipv4-num.csv',
      ipv6_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/iptoasn-country/iptoasn-country-ipv6-num.csv',
    },
  },
  db_ip_lite: {
    desc: 'DB-IP Lite Country',
    type: 'country',
    license: 'CC BY 4.0 by DB-IP',
    update_freq: 'monthly',
    url: {
      ipv4: 'https://cdn.jsdelivr.net/npm/@ip-location-db/dbip-country/dbip-country-ipv4.csv',
      ipv6: 'https://cdn.jsdelivr.net/npm/@ip-location-db/dbip-country/dbip-country-ipv6.csv',
      ipv4_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/dbip-country/dbip-country-ipv4-num.csv',
      ipv6_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/dbip-country/dbip-country-ipv6-num.csv',
    },
  },
  db_ip_lite_city: {
    desc: 'DB-IP Lite City',
    type: 'city',
    license: 'CC BY 4.0 by DB-IP',
    update_freq: 'monthly',
    url: {
      ipv4: 'https://raw.githubusercontent.com/sapics/ip-location-db/master/dbip-city/dbip-city-ipv4.csv.gz',
      ipv6: 'https://raw.githubusercontent.com/sapics/ip-location-db/master/dbip-city/dbip-city-ipv6.csv.gz',
      ipv4_num:
        'https://raw.githubusercontent.com/sapics/ip-location-db/master/dbip-city/dbip-city-ipv4-num.csv.gz',
      ipv6_num:
        'https://raw.githubusercontent.com/sapics/ip-location-db/master/dbip-city/dbip-city-ipv6-num.csv.gz',
    },
  },
  geolite2: {
    desc: 'GeoLite2 Country',
    type: 'country',
    license: 'GeoLite2 License by MaxMind',
    update_freq: 'weekly',
    url: {
      ipv4: 'https://cdn.jsdelivr.net/npm/@ip-location-db/geolite2-country/geolite2-country-ipv4.csv',
      ipv6: 'https://cdn.jsdelivr.net/npm/@ip-location-db/geolite2-country/geolite2-country-ipv6.csv',
      ipv4_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/geolite2-country/geolite2-country-ipv4-num.csv',
      ipv6_num:
        'https://cdn.jsdelivr.net/npm/@ip-location-db/geolite2-country/geolite2-country-ipv6-num.csv',
    },
  },
  geolite2_city: {
    desc: 'GeoLite2 City',
    type: 'city',
    license: 'GeoLite2 License by MaxMind',
    update_freq: 'weekly',
    url: {
      ipv4: 'https://raw.githubusercontent.com/sapics/ip-location-db/master/geolite2-city/geolite2-city-ipv4.csv.gz',
      ipv6: 'https://raw.githubusercontent.com/sapics/ip-location-db/master/geolite2-city/geolite2-city-ipv6.csv.gz',
      ipv4_num:
        'https://raw.githubusercontent.com/sapics/ip-location-db/master/geolite2-city/geolite2-city-ipv4-num.csv.gz',
      ipv6_num:
        'https://raw.githubusercontent.com/sapics/ip-location-db/master/geolite2-city/geolite2-city-ipv6-num.csv.gz',
    },
  },
}

export default urls
