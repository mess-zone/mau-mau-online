import { Carta } from "../entities/carta"
import { ArrayList } from "../entities/array-list"

/**
 * Representa as cartas na mão de um jogador
 */
export class Jogador {
    private readonly id: string
    private list: ArrayList<Carta>

    constructor(id: string, list: ArrayList<Carta>) {
        this.id = id
        this.list = list
    }

    public getId() {
        return this.id
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

    // TODO o metodo não é util, 
    // porque o jogador pode conter cartas com o mesmo naipe e número, mas será retornado false se os ids forem diferentes
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