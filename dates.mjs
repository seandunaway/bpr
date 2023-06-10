#!/usr/bin/env node

let date_start = new Date ('2018')
let date_end = new Date ()

let dates = []
for (let date_i = date_start; date_i <= date_end; date_i .setDate (date_i .getDate () + 1)) {
    let date = date_string (date_i)
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

export function date_string (date) {
  let month = date .getMonth () + 1
  let day = date .getDate ()
  let year = date .getFullYear ()

  let date_string = `${month}/${day}/${year}`
  return date_string
}
