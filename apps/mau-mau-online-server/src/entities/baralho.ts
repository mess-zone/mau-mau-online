import { Carta } from "@/entities/carta"
import { Naipe, NaipeStrings } from "@/entities/naipe"
import { NumeroCarta, NumeroCartaStrings } from "@/entities/numero-carta";


export class Baralho {
    public cartas: Carta[] = []

    constructor() {
        for (const n in Naipe) {
            for (const carta in NumeroCarta) {
              const novaCarta: Carta = { naipe: Naipe[n as NaipeStrings], numero: NumeroCarta[carta as NumeroCartaStrings] };
              this.cartas.push(novaCarta);
            }
        }
    }
}