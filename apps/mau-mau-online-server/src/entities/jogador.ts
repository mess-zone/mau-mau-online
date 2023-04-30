import { Carta } from "@/entities/carta"
import { ArrayList } from "@/entities/array-list"

/**
 * Representa as cartas na mão de um jogador
 */
export class Jogador {
    private list: ArrayList<Carta>

    constructor(list: ArrayList<Carta>) {
        this.list = list
    }

    public size() {
        return this.list.size()
    }

    public botarCarta(carta: Carta) {
        this.list.add(carta)
    }

    public tirarCarta(carta: Carta) {
        return this.list.remove(carta)
    }

    // public tirarCartaAtIndex(index: number) {
    //     return this.list.removeAtIndex(index)
    // }

    public contains(carta: Carta) {
        return this.list.contains(carta)
    }

    public get(index: number) {
        return this.list.get(index)
    }

    public indexOf(carta: Carta) {
        return this.list.indexOf(carta)
    }

    public *iterator() {
        yield* this.list.iterator()
    }
}