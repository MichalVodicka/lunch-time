import {
    parse
} from 'node-html-parser'
import {compareDates, findDate, getToday} from "../util";
import {Parser} from "../types";

export const ucapa:Parser = (htmlAsString)=>{
    const root = parse(htmlAsString);
    let  menicka = root.querySelector('div.listek').querySelectorAll('div.row')

    const menu = {
        soups:[],
        dishes:[]
    }

    const selectedMenu = menicka.filter(menu=>{
        if(!menu.querySelector(".date")){
            return false
        }
        const menuDate = findDate(menu.querySelector(".date").innerHTML)
        return compareDates(getToday(),menuDate)
    })[0]

    if(!selectedMenu){
        return menu
    }

    menu.soups = selectedMenu.querySelectorAll(".row-polevka").map(soup=>{
        return {
            name:soup?soup.textContent.trim():null,
            price: NaN
        }
    })

    menu.dishes = selectedMenu.querySelectorAll(".row-food").map(dish=>{
        return {
            name:dish.querySelector('.food')?dish.querySelector('.food').textContent.trim():null,
            price:dish.querySelector('.price')?parseInt(dish.querySelector('.price').textContent.trim()):NaN
        }
    })

    return menu
}
