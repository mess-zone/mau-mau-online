import { Carta } from "@/entities/carta";
import { Stack } from "@/entities/stack";

/**
 * Representa o monte de cartas colocadas de frente para cima na mesa
 */
export class Mesa {
    private stack: Stack<Carta>

    constructor(stack: Stack<Carta>) {
        this.stack = stack
    }

    /**
     * Retorna true se é permitido colocar a carta no monte
     * @param carta 
     */
    public validateMove(carta: Carta) {
        // se o monte estiver vazio, aceita qualquer carta
        if(this.size() == 0) return true

        // aceita carta com o mesmo naipe do monte
        if(carta.naipe == this.peek().naipe) {
            return true
        }

        return false
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
}