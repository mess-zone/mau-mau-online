import { Carta } from "../entities/carta";
import { Stack } from "../entities/stack";

/**
 * Representa o monte de cartas colocadas de frente para cima na mesa
 */
export class PilhaDeDescarte {
    private stack: Stack<Carta>

    constructor(stack: Stack<Carta>) {
        this.stack = stack
    }

    public botarCarta(carta: Carta) {
        this.stack.push(carta)
    }

    public size() {
        return this.stack.size()
    }

    public peek() {
        return this.stack.peek()
    }

    public clear() {
        const topo = this.stack.pop()
        const cartas = this.stack.clear()

        if(topo) {
            this.stack.push(topo)
        }
        return cartas
    }
}