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

    private _status: StatusPartida
    private _currentJogador: number = -1
    private _cartasPorJogador: number = 7



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

    /**
     * Retira uma carta do baralho virado para baixo e coloca na mão de um jogador

     */
    private pescarCarta(jogador: Jogador) {
        const carta = this.baralho.tirarCarta()
        // TODO E SE NÃO HOUVER CARTAS?
        jogador.botarCarta(carta)
    }

    private distribuirCartas() {
        for(const jogador of this.jogadores) {
            for(let i = 0; i < this._cartasPorJogador; i++) {
                this.pescarCarta(jogador)
            }
        }
    }


    public start() {
        if(this.jogadores.length >= 2) {
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
        this._currentJogador = (this._currentJogador + 1) % this.jogadores.length
    }

}