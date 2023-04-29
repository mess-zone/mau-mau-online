import { Carta } from "@/entities/carta"
import { Naipe, NaipeStrings } from "@/entities/naipe"
import { NumeroCarta, NumeroCartaStrings } from "@/entities/numero-carta";
import { Stack } from "@/entities/stack";
import { shuffleArray } from "@/utils/shuffle-array";


/**
 * Representa o monte de cartas colocadas de frente para baixo na mesa
 */
export class Baralho {
    private stack: Stack<Carta>

    constructor(stack: Stack<Carta>) {
        const cartas: Carta[] = []

        for (const n in Naipe) {
            for (const carta in NumeroCarta) {
              const novaCarta: Carta = { naipe: Naipe[n as NaipeStrings], numero: NumeroCarta[carta as NumeroCartaStrings] }
              Object.freeze(novaCarta);
              cartas.push(novaCarta)
            }
        }

        this.stack = stack
        for(const carta of shuffleArray(cartas)) {
            this.stack.push(carta)
        }

    }

    public tirarCarta() {
        return this.stack.pop()
    }

    public size() {
        return this.stack.size()
    }
}