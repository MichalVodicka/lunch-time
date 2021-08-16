import {menickacz} from './menickacz'
import {ucapa} from './ucapa'
import {suzies} from './suzies'
import {Parser} from "../types";

export const parsers: { [index:string]:Parser } = {
    menickacz,
    ucapa,
    suzies
}
