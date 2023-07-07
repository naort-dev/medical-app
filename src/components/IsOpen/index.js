export function isOpen(shop) {
    const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    d = new Date();
    let weekday = week[d.getDay()]
    let times = shop.hours[weekday.toLowerCase()]
    let time = d.getHours()*60 + d.getMinutes()
    let status = (time > times.opens_at) && (time < times.closes_at)
    resp = {
        shop : shop,
        open : {
            status: status,
            closingTime: convertToTime(times.closes_at),
            openingTime: convertToTime(times.opens_at)
        }
    }
    return resp
}

function convertToTime(time) {
    let hours = time/60
    let min = time % 60
    let resp = hours + ":" + min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    return resp
}

