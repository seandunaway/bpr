#!/usr/bin/env node

let index_response = await fetch ('https://www.cftc.gov/MarketReports/BankParticipationReports/index.htm')
let index_response_text = await index_response .text ()

let report_urls = index_response_text .match (/\/MarketReports\/BankParticipation(?:Reports)*\/dea[a-z]{3,}[0-9]{2}f/g)

let bpr = []
for (let report_url of report_urls) {
    let report_response = await fetch (`https://www.cftc.gov/${report_url}`)
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

console .log (bpr)
console .log (bpr.length)

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
