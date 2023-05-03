import { Carta } from "../entities/carta"
import { ArrayList } from "../entities/array-list"

type JogadorConfig = {
    id: string, 
    cartas: ArrayList<Carta>,
}
/**
 * Representa as cartas na mão de um jogador
 */
export class Jogador {
    private readonly id: string
    private active: boolean = true
    private list: ArrayList<Carta>

    constructor({ id, cartas }: JogadorConfig) {
        this.id = id
        this.list = cartas
    }

    public getId() {
        return this.id
    }

    public isActive() {
        return this.active
    }

    public setActive(active: boolean) {
        this.active = active
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

    public getCartaById(id: string) {
        for(const carta of this.iterator()) {
            if(carta.id === id) {
                return carta
            }
        }

        return undefined
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