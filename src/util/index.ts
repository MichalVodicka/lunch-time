type tDate = {
    d:number,
    m:number,
    y:number
}

export const findDate = (dateString: string):tDate=>{
    const getDay = /(\d+)\.\s?(\d+)\.\s?(\d+)/
    const dateObject = dateString.match(getDay)
    return {
        d:parseInt(dateObject[1]),
        m:parseInt(dateObject[2]),
        y:parseInt(dateObject[3])
    }
}

export const getToday = ():tDate=>{
    var today = new Date();
    return {
        d:today.getDate(),
        m:today.getMonth() + 1, //January is 0!
        y:today.getFullYear()
    }
}

export const compareDates = (dateOne:tDate,dateTwo:tDate):boolean=>{
    return dateOne.d === dateTwo.d && dateOne.m === dateTwo.m && dateOne.y === dateTwo.y
}
