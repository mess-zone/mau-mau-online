import { Baralho } from "@/entities/baralho";
import { PilhaDeDescarte } from "./pilha-de-descarte";
import { Jogador } from "./jogador";
import { StatusPartida } from "./status-partida";

type PartidaOptions = { 
    baralho: Baralho,
    pilhaDeDescarte: PilhaDeDescarte,
    jogadores: Jogador[]
}

export class Partida {
    public readonly baralho: Baralho
    public readonly pilhaDeDescarte: PilhaDeDescarte
    public readonly jogadores: Jogador[]

    public _status: StatusPartida
    public _currentJogador: number

    constructor({ baralho, pilhaDeDescarte, jogadores }: PartidaOptions) {
        this.baralho = baralho
        this.pilhaDeDescarte = pilhaDeDescarte
        this.jogadores = jogadores

        this._status = StatusPartida.PENDENTE
    }

    public get status() {
        return this._status
    }

    public get currentJogador() {
        return this._currentJogador
    }

    start() {
        if(this.jogadores.length >= 2) {
            this._status = StatusPartida.EM_ANDAMENTO
            this._currentJogador = 0
            return true
        }
        return false
    }
}