import * as https from 'https'
import restaurants from './restaurants.json'
import {parsers} from "./parser";
import {renderer} from "./renderer";
import {Iconv} from 'iconv'
import {Menu, Restaurant} from "./types";

const defaultCharset = 'UTF-8'
const timeOutMS=1000;
/**
 * download html pages
 */
const downloadedPages = restaurants.Brno.map(restaurant => {
    return new Promise<Restaurant>((resolve,reject) => {
        const timeoutHandle = setTimeout(reject,timeOutMS)
        https.get(restaurant.url, res => {

            // unfortunately not every page is encoded in UTF-8
            const getCharset = /\bcharset=\b(.*)/
            const charset = res.headers["content-type"].match(getCharset)[1] ?? // index 0 is whole string
                defaultCharset  // if there is no charset use default
            const converter = defaultCharset !== charset ? new Iconv(charset, defaultCharset) : null

            let data = ""
            res.on('data', d => {
                // convert between page charset and default charset if needed
                data += converter ? converter.convert(d) : d
            })
            // once finished reading - resolve the promise
            res.on('end', function () {
                clearTimeout(timeoutHandle)
                resolve({
                    name:restaurant.name,
                    parser:restaurant.parser,
                    data
                })
            });
        })
    })
})

/**
 * go through downloaded pages and extract menu from them.
 */
Promise.all(downloadedPages).then(html => {
    return html.map(menu => {
        if (parsers[menu.parser]) {
            return <Menu>{
                restaurant: menu.name,
                processedMenu: parsers[menu.parser](menu.data)
            }
        }
        throw Error(`Parser doesn't exist for ${menu.name}`)
    })
})
    // show all menus in nice way ... ok ... no so nice
    .then(ob => ob.map(renderer['basic']))
    .catch(e=>{
        console.log('It looks like a starving day, not even lions eat each day!')
        console.log('... but if you are really hungry, you can fix the error ;-) ')
        console.log(e)
    })

export default downloadedPages
