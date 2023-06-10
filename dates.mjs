#!/usr/bin/env node

let date_start = new Date ('2018')
let date_end = new Date ()

let dates = []
for (let date_i = date_start; date_i <= date_end; date_i .setDate (date_i .getDate () + 1)) {
    let month = date_i .getMonth () + 1
    let day = date_i .getDate ()
    let year = date_i .getFullYear ()

    let date = `${month}/${day}/${year}`
    dates .push (date)
}

console .log (dates)
console .log (dates.length)

export default dates

/*
[
  '12/31/2017', '1/1/2018',  '1/2/2018',  '1/3/2018',  '1/4/2018'
]
*/
