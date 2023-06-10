#!/usr/bin/env node

import report_urls from './bpr_urls.json' assert { type: 'json' }

let bpr = []
for (let report_url of report_urls) {
    let report_response = await fetch (report_url)
    let report_response_text = await report_response .text ()

    let report_date = report_response_text .match (/REPORT DATE: (\d{1,2}\/\d{1,2}\/\d{4})</)
    let report_data = report_response_text .match (/(?<name>CME E-MINI S&amp;P 500).+?>([\d,.]+)<.+?>([\d,.]+)<.+?>([\d,.]+)<.+?>([\d,.]+)<.+?>([\d,.]+)<.+?>(?<oi>[\d,.]+)<.+?>([\d,.]+)<.+?>([\d,.]+)<.+?>([\d,.]+)<.+?>([\d,.]+)<.+?>([\d,.]+)<.+?>([\d,.]+)<.+?>(?<long>[\d,.]+)<.+?>([\d,.]+)<.+?>(?<short>[\d,.]+)<.+?>([\d,.]+)</s)

    let date = report_date [1]
    let long = parseInt (report_data.groups.long .replace (/,/g, ''))
    let short = parseInt (report_data.groups.short .replace (/,/g, ''))
    let oi = parseInt (report_data.groups.oi .replace (/,/g, ''))
    let delta = long - short

    let report = {
        date,
        long,
        short,
        oi,
        delta,
    }
    bpr .push (report)
}

export default bpr

/*
[
    {
        date: '5/4/2021',
        long: 84941,
        short: 333983,
        oi: 2705647,
        delta: -249042
    }
]
*/
