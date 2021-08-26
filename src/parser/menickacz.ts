import {
    parse
} from 'node-html-parser'
import {compareDates, findDate, getToday} from "../util";
import {Parser} from "../types";

export const menickacz:Parser = (htmlAsString)=>{
    const root = parse(htmlAsString);
    let  menicka = root.querySelectorAll('.menicka')

    const menu = {
        soups:[],
        dishes:[]
    }

    const selectedMenu = menicka.filter(menu=>{
        const menuDate = findDate(menu.querySelector(".nadpis").textContent)
        return compareDates(getToday(),menuDate)
    })[0]

    if(!selectedMenu){
        return menu
    }

    menu.soups = selectedMenu.querySelectorAll(".polevka").map(soup=>{
        return {
            name:soup.querySelector('.polozka')?soup.querySelector('.polozka').textContent:null,
            price:soup.querySelector('.cena')?parseInt(soup.querySelector('.cena').textContent):NaN
        }
    })

    menu.dishes = selectedMenu.querySelectorAll(".jidlo").map(dish=>{
        return {
            name:dish.querySelector('.polozka')?dish.querySelector('.polozka').textContent:null,
            price:dish.querySelector('.polozka')?parseInt(dish.querySelector('.cena').textContent):NaN
        }
    })

    return menu
}
