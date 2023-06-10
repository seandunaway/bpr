#!/usr/bin/env node

import { writeFileSync } from 'node:fs'

let months = ['jan', 'feb', 'jfeb', 'mar', 'jmar', 'apr', 'may', 'jun', 'june', 'jul', 'july', 'aug', 'august', 'sep', 'september', 'oct', 'october', 'nov', 'dec']
let years = ['18', '19', '20', '21', '22', '23']

let possible_urls = []
for (let year of years) {
    for (let month of months) {
        possible_urls .push (`https://www.cftc.gov/MarketReports/BankParticipation/dea${month}${year}f`)
        possible_urls .push (`https://www.cftc.gov/MarketReports/BankParticipationReports/dea${month}${year}f`)
    }
}

let report_urls = []
for (let i = 0; i < possible_urls.length; i ++) {
    // sleep
    await new Promise (function (resolve) { setTimeout (resolve, 100) })

    let possible_url = possible_urls [i]
    let response
    try {
        response = await fetch (possible_url, { method: 'HEAD' })
    } catch (error) {
        console .error (error.message)

        // retry
        i --
        continue
    }

    if (response?.status == 404) {
        console .log ('missing:', possible_url)
        continue
    }

    console .log ('found:', possible_url)
    report_urls .push (possible_url)
}

writeFileSync ('./bpr_report_urls.json', JSON.stringify (report_urls))

console .log (report_urls)
console .log (report_urls.length)

export default report_urls

/*
[
  'https://www.cftc.gov/MarketReports/BankParticipationReports/deajan18f',
  'https://www.cftc.gov/MarketReports/BankParticipationReports/deafeb18f'
]
*/
