import {
    parse
} from 'node-html-parser'
import {compareDates, findDate, getToday} from "../util";
import {Parser} from "../types";

export const suzies:Parser = (htmlAsString)=>{
    const root = parse(htmlAsString);
    let menicka = root.querySelector('#food-grid').querySelectorAll('.item')

    const menu = {
        soups:[],
        dishes:[]
    }
    const selectedMenu = menicka.filter(menu=>{
        const menuDate = findDate(menu.querySelector("h2").textContent)
        return compareDates( getToday(),menuDate)
    })[0]

    if(!selectedMenu){
        return menu
    }

    const allTitles = selectedMenu.querySelectorAll("h3.uk-margin-remove-bottom").map(title=> {
        return title.textContent.trim()
    })

    const allMeals = selectedMenu.querySelectorAll("div.uk-width-expand").map(title=> {
        return title.lastChild.innerText.trim()
    })

    if(!selectedMenu){
        return menu
    }

    allTitles.map((oneTitle,i)=>{
        if(oneTitle==='Polévka'){
            menu.soups.push(allMeals[i])
            return true
        }else if(oneTitle==='Dezert'){
            // lets skip desert ...
            return true
        }
        menu.dishes.push(allMeals[i])
    })

    return menu
}
