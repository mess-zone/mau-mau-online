import { Carta } from "@/entities/carta"
import { Naipe, NaipeStrings } from "@/entities/naipe"
import { NumeroCarta, NumeroCartaStrings } from "@/entities/numero-carta";
import { Stack } from "@/entities/stack";


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
              cartas.push(novaCarta)
            }
        }

        this.shuffleArray(cartas)

        this.stack = stack

        for(const carta of cartas) {
            this.stack.push(carta)
        }

    }

    /**
     * Fisher-Yates algorithm
     */
    private shuffleArray(array: Carta[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    public tirarCarta() {
        return this.stack.pop()
    }

    public size() {
        return this.stack.size()
    }
}