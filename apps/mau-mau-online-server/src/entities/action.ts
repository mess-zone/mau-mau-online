import { Carta } from "@/entities/carta";

export interface Action {
    execute(options: any): Carta[]
}