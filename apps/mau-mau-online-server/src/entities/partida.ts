import { Baralho } from "@/entities/baralho";
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Jogador } from "@/entities/jogador";
import { StatusPartida } from "@/entities/status-partida";
import { Carta } from "@/entities/carta";

type PartidaOptions = { 
    baralho: Baralho,
    pilhaDeDescarte: PilhaDeDescarte,
    jogadores: Jogador[]
}

type MoveType = 'PESCAR' | 'DESCARTAR'

type Move = {
    jogadorIndex: number,
    moveType: MoveType,
    cardIndex?: number
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
    private pescarCarta(jogadorIndex: number): Carta {
        if(jogadorIndex !== this._currentJogador) { throw new Error('Não é a vez do jogador!') }

        const carta = this.baralho.tirarCarta()
        if(!carta) { throw new Error('Não há mais cartas disponíveis no baralho!') }

        this.jogadores[jogadorIndex].botarCarta(carta)

        return carta
    }

    /**
     * Retira uma carta da mão do jogador e colocar na pilha de descarte virada para cima
     */
    private descartarCarta(jogadorIndex: number, cartaIndex: number): Carta {
        if(jogadorIndex !== this._currentJogador) { throw new Error('Não é a vez do jogador!') }

        try {
            const carta = this.jogadores[jogadorIndex].tirarCartaAtIndex(cartaIndex)
    
            this.pilhaDeDescarte.botarCarta(carta)

            return carta
        } catch(error) {
            throw error
        }

    }

    private distribuirCartas() {
        for(let jogadorIndex = 0; jogadorIndex < this.jogadores.length; jogadorIndex++) {
            for(let i = 0; i < this._cartasPorJogador; i++) {
                const carta = this.baralho.tirarCarta()
                // TODO E SE NÃO HOUVER CARTAS SUFICIENTES?
                this.jogadores[jogadorIndex].botarCarta(carta)
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

    public move({ jogadorIndex, moveType, cardIndex }: Move) {
        if(this._status !== StatusPartida.EM_ANDAMENTO) { throw new Error('A partida não está em andamento') }

        if (moveType === 'DESCARTAR') {
            return this.descartarCarta(jogadorIndex, cardIndex)
        } else if(moveType === 'PESCAR') {
            return this.pescarCarta(jogadorIndex)
        } 
    }

}