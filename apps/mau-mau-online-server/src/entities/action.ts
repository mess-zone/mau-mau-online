import { Carta } from "./carta";

export interface Action {
    execute(options: any): Carta[]
}