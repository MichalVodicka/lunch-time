export type ProcessedMenu = {
    soups:string[],
    dishes:string[]
}
export type Parser = (html:string)=>ProcessedMenu

export type Restaurant = {
    name: string
    parser:string
    data: string
}

export type Menu ={
    restaurant: string,
    processedMenu: ProcessedMenu
}

export type Renderer = (menu:Menu)=>void
