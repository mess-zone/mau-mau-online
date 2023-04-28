import { Carta } from "@/entities/carta";
import { Stack } from "@/entities/stack";

/**
 * Representa o monte de cartas colocadas de frente para cima na mesa
 */
export class Mesa {
    public stack: Stack<Carta>

    constructor() {
        this.stack = new Stack<Carta>()
    }
}