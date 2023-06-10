#!/usr/bin/env node

import bpr_urls from './bpr_urls.json' assert { type: 'json' }

let bpr_options = []
for (let report_url of bpr_urls.options) {
    let report_response = await fetch (report_url)
    let report_response_text = await report_response .text ()

    let report_date = report_response_text .match (/REPORT DATE: (\d{1,2}\/\d{1,2}\/\d{4})</)

    let report_data
    let report_data_regexes = [
        /(?<name>CME E-MINI S&amp;P 500).+?(<\/tr>.+?){1,2}([\d,]+?)<.+?>(?<call_long>[\d,]+?)<.+?>(?<call_short>[\d,]+?)<.+?>(?<put_long>[\d,]+?)<.+?>(?<put_short>[\d,]+?)<.+?>/s,
        /(?<name>CME E-MINI S&amp;P 500).+?<b>(.+?)<.+?<b>(?<call_long>.+?)<.+?<b>(.+?)<.+?<b>(?<call_short>.+?)<.+?<b>(.+?)<.+?<b>(?<put_long>.+?)<.+?<b>(.+?)<.+?<b>(?<put_short>.+?)<.+?<b>(.+?)</s,
    ]
    for (let report_data_regex of report_data_regexes) {
        report_data = report_response_text .match (report_data_regex)
        if (report_data) break
    }

    let date = report_date [1]
    let call_long = parseInt (report_data.groups.call_long .replace (/,/g, ''))
    let call_short = parseInt (report_data.groups.call_short .replace (/,/g, ''))
    let put_long = parseInt (report_data.groups.put_long .replace (/,/g, ''))
    let put_short = parseInt (report_data.groups.put_short .replace (/,/g, ''))

    let call_delta = call_long - call_short
    let put_delta = put_long - put_short
    let call_put_delta = call_delta - put_delta
    let call_put_ratio = Math.round ((call_delta / put_delta) * 100) / 100

    let report = {
        date,
        call_long,
        call_short,
        put_long,
        put_short,

        call_delta,
        put_delta,
        call_put_delta,
        call_put_ratio,
    }
    bpr_options .push (report)
}

export default bpr_options

/*
[
  {
    date: '6/6/2023',
    call_long: 13871,
    call_short: 38943,
    put_long: 40912,
    put_short: 14,
    call_delta: -25072,
    put_delta: 40898,
    call_put_delta: -65970,
    call_put_ratio: -0.61
  }
]
*/
