import {Renderer} from "../types";

const priceSanitize = (price:number, {desiredLength,currency}={desiredLength:7,currency:'CZK'})=>{
    if(isNaN(price)){
        return ' '.repeat(desiredLength)
    }
    const text = price.toString() + ' ' + currency
    const length = desiredLength>text.length?desiredLength - text.length:0
    return text.concat(' '.repeat(length)).slice(0,desiredLength)
}

const basic:Renderer = (menu) => {
    console.log('====== ', menu.restaurant, ' ======')
    console.log("=== Soup")
    menu.processedMenu.soups.map(soup => {
        console.log(priceSanitize(soup.price),soup.name)
    })
    console.log("=== Main Dish")
    menu.processedMenu.dishes.map(dish => {
        console.log(priceSanitize(dish.price),dish.name)
    })
        console.log('')
        console.log('')
}

export {basic}
