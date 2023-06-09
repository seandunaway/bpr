#!/usr/bin/env node

import { writeFileSync } from 'node:fs'

let base_url = 'https://www.cftc.gov/MarketReports/'
let years = ['18', '19', '20', '21', '22', '23']
let months = ['jan', 'feb', 'jfeb', 'mar', 'jmar', 'apr', 'may', 'jun', 'june', 'jul', 'july', 'aug', 'august', 'sep', 'september', 'oct', 'october', 'nov', 'dec']
let folders = ['BankParticipation', 'BankParticipationReports']
let suffixes = ['f', 'o']

let possible_urls = []
for (let year of years) {
    for (let month of months) {
        for (let folder of folders) {
            for (let suffix of suffixes) {
                possible_urls .push (`${base_url}${folder}/dea${month}${year}${suffix}`)
            }
        }
    }
}

let urls = {
    futures: [],
    options: [],
    other: [],
}
for (let i = 0; i < possible_urls.length; i ++) {
    let possible_url = possible_urls [i]

    // sleep
    await new Promise (function (resolve) { setTimeout (resolve, 100) })

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

    let last_character = possible_url .charAt (possible_url.length - 1)
    switch (last_character) {
        case 'f':
            urls.futures .push (possible_url)
            break
        case 'o':
            urls.options .push (possible_url)
            break
        default:
            urls.other .push (possible_url)
    }
}

let json = JSON.stringify (urls, false, 4)
writeFileSync ('./bpr_urls.json', json)

export default urls

/*
[
  'https://www.cftc.gov/MarketReports/BankParticipationReports/deajan18f',
  'https://www.cftc.gov/MarketReports/BankParticipationReports/deajan18o'
]
*/
