#!/usr/bin/env node

import { date_string } from './dates.mjs'

let date_start = Math .round (new Date ('2018') / 1000)
let date_end = Math .round (Date .now () / 1000)

let response = await fetch (`https://query2.finance.yahoo.com/v8/finance/chart/ES=F?interval=1d&period1=${date_start}&period2=${date_end}`)
let response_json = await response .json ()
let response_result = response_json.chart.result[0]

let spoo = []
for (let i = 0; i <= response_result.timestamp.length; i++) {
    let date = date_string (new Date (response_result.timestamp [i] * 1000))
    let price = response_result.indicators.quote[0].close [i]
    let volume = response_result.indicators.quote[0].volume [i]

    let quote = {
        date,
        price,
        volume,
    }
    spoo .push (quote)
}

export default spoo

/*
[
  {
    date: '1/3/2021',
    price: 3692.25,
    volume: 2037616
  }
]
*/
