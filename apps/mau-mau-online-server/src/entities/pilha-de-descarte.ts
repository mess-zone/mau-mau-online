import { Carta } from "@/entities/carta";
import { Stack } from "@/entities/stack";

/**
 * Representa o monte de cartas colocadas de frente para cima na mesa
 */
export class PilhaDeDescarte {
    private stack: Stack<Carta>

    constructor(stack: Stack<Carta>) {
        this.stack = stack
    }

    /**
     * Retorna true se é permitido colocar as cartas no monte
     * @param cartas 
     * @deprecated
     */
    public validateMove(cartas: Carta[]) {
        // todas as cartas devem ter o mesmo naipe e número
        if(cartas.length > 1) {
            if(!cartas.every((carta) => carta.naipe == cartas[0].naipe || carta.numero == cartas[0].numero)) {
                return false
            }
        }

        // se o monte estiver vazio, aceita qualquer carta
        if(this.size() == 0) return true

        // aceita cartas com o mesmo naipe ou numero do topo do monte
        if(cartas.every((carta) => carta.naipe == this.peek().naipe || carta.numero == this.peek().numero)) {
            return true
        }

        // não aceitar carta com numero e naipe diferente do topo do monte
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