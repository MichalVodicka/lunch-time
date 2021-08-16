import {Renderer} from "../types";

const basic:Renderer = (menu) => {
    console.log('====== ', menu.restaurant, ' ======')
    console.log("=== Soup")
    menu.processedMenu.soups.map(soup => console.log(soup))
    console.log("=== Main Dish")
    menu.processedMenu.dishes.map(dish => console.log(dish))
    console.log('')
    console.log('')
}

export {basic}
