import { Baralho } from "../entities/baralho";
import { PilhaDeDescarte } from "../entities/pilha-de-descarte";
import { Jogador } from "../entities/jogador";
import { StatusPartida } from "../entities/status-partida";
import { Subject } from "../entities/observer";

export type PartidaOptions = { 
    baralho: Baralho,
    pilhaDeDescarte: PilhaDeDescarte,
    jogadores: Jogador[],
}

export class Partida extends Subject {
    private readonly _baralho: Baralho
    private readonly _pilhaDeDescarte: PilhaDeDescarte
    private readonly _jogadores: Jogador[]

    private _status: StatusPartida
    private _currentJogador: number = -1
    private _cartasPorJogador: number = 7

    constructor({ baralho, pilhaDeDescarte, jogadores }: PartidaOptions) {
        super()
        this._baralho = baralho
        this._pilhaDeDescarte = pilhaDeDescarte
        this._jogadores = jogadores

        this._status = StatusPartida.PENDENTE
    }

    public get status() {
        return this._status
    }

    public get currentJogador() {
        return this._currentJogador
    }

    public getBaralho() {
        return this._baralho
    }

    public getJogadores() {
        return this._jogadores
    }

    public getPilhaDeDescarte() {
        return this._pilhaDeDescarte
    }

    // TODO refactor to become a action?
    private distribuirCartas() {
        for(let jogadorIndex = 0; jogadorIndex < this.getJogadores().length; jogadorIndex++) {
            for(let i = 0; i < this._cartasPorJogador; i++) {
                const carta = this._baralho.tirarCarta()
                // TODO E SE NÃO HOUVER CARTAS SUFICIENTES?
                this.getJogadores()[jogadorIndex].botarCarta(carta)
            }
        }
    }

    public refillBaralho() {
        const cartas = this.getPilhaDeDescarte().clear()
        this.getBaralho().refill(cartas)

        this.notifyObservers({ tipo: 'refill', dados: { cartas } })
    }

    public start() {
        if(this.status != StatusPartida.PENDENTE) { return false }

        if(this.getJogadores().length < 2) { return false }

        this._status = StatusPartida.EM_ANDAMENTO
        this.distribuirCartas()
        this.notifyObservers({ tipo: 'start', dados: {} })

        this.nextPlayer()
        return true
    }

    public cancel() {
        this._status = StatusPartida.CANCELADA
        this.notifyObservers({ tipo: 'cancel', dados: {} })
    }

    public nextPlayer() {
        const getNextIndex = (index: number) => (index + 1) % this.getJogadores().length

        for(let i = 0; i < this.getJogadores().length - 1; i++) {
            let nextJogador = getNextIndex(this._currentJogador + i)
            if(this.getJogadores()[nextJogador].isActive()) {
                this._currentJogador = nextJogador
                this.notifyObservers({ tipo: 'next-player', dados: { jogadorIndex: this._currentJogador } })
                return 
            }
        }
    }

    public checkEnd() {
        if(this.getJogadores()[this._currentJogador].size() == 0) {
            this._status = StatusPartida.FINALIZADA
            this.notifyObservers({ tipo: 'finalized', dados: { winner: this._currentJogador } })

            return true
        }

        return false
    }

    // TODO permitir baralho com mais de um set de cartas

}