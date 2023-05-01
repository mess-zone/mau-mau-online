import { Baralho } from "@/entities/baralho";
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Jogador } from "@/entities/jogador";
import { StatusPartida } from "@/entities/status-partida";

export type PartidaOptions = { 
    baralho: Baralho,
    pilhaDeDescarte: PilhaDeDescarte,
    jogadores: Jogador[],
}

export class Partida {
    private readonly _baralho: Baralho
    public readonly _pilhaDeDescarte: PilhaDeDescarte
    private readonly _jogadores: Jogador[]

    private _status: StatusPartida
    private _currentJogador: number = -1
    private _cartasPorJogador: number = 7

    constructor({ baralho, pilhaDeDescarte, jogadores }: PartidaOptions) {
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
        for(let jogadorIndex = 0; jogadorIndex < this._jogadores.length; jogadorIndex++) {
            for(let i = 0; i < this._cartasPorJogador; i++) {
                const carta = this._baralho.tirarCarta()
                // TODO E SE NÃO HOUVER CARTAS SUFICIENTES?
                this._jogadores[jogadorIndex].botarCarta(carta)
            }
        }
    }

    public start() {
        if(this._jogadores.length >= 2) {
            this._status = StatusPartida.EM_ANDAMENTO
            this.distribuirCartas()
            this.nextPlayer()
            return true
        }
        return false
    }

    public cancel() {
        this._status = StatusPartida.CANCELADA
    }

    public nextPlayer() {
        this._currentJogador = (this._currentJogador + 1) % this._jogadores.length
    }

}