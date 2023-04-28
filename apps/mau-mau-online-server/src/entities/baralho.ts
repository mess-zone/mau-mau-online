import { Carta } from "@/entities/carta"
import { Naipe, NaipeStrings } from "@/entities/naipe"
import { ValorCarta, ValorCartaStrings } from "@/entities/valor-carta";


export class Baralho {
    public cartas: Carta[] = []

    constructor() {
        for (const n in Naipe) {
            for (const carta in ValorCarta) {
              const novaCarta: Carta = { naipe: Naipe[n as NaipeStrings], valor: ValorCarta[carta as ValorCartaStrings] };
              this.cartas.push(novaCarta);
            }
        }
    }
}