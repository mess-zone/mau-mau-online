import { Baralho } from "@/entities/baralho";
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Jogador } from "@/entities/jogador";
import { StatusPartida } from "@/entities/status-partida";
import { Carta } from "@/entities/carta";

export type PartidaOptions = { 
    baralho: Baralho,
    pilhaDeDescarte: PilhaDeDescarte,
    jogadores: Jogador[],
}

type MoveType = 'PESCAR' | 'DESCARTAR'

type Move = {
    jogadorIndex: number,
    moveType: MoveType,
    cartas?: Carta[],
    qtd?: number,
}

export class Partida {
    private readonly _baralho: Baralho
    public readonly pilhaDeDescarte: PilhaDeDescarte
    private readonly _jogadores: Jogador[]

    private _status: StatusPartida
    private _currentJogador: number = -1
    private _cartasPorJogador: number = 7



    constructor({ baralho, pilhaDeDescarte, jogadores }: PartidaOptions) {
        this._baralho = baralho
        this.pilhaDeDescarte = pilhaDeDescarte
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

    /**
     * 
     */
    /**
     * Retira cartas do baralho virado para baixo e coloca na mão de um jogador
     * @param jogadorIndex 
     * @param qtd number Quantidade de cartas
     * @returns 
     */
    private pescarCartas(jogadorIndex: number, qtd: number = 1): Carta[] {
        if(jogadorIndex !== this._currentJogador) { throw new Error('Não é a vez do jogador!') }

        if (this._baralho.size() < qtd) { throw new Error('Não há cartas suficientes disponíveis no baralho!') }
        
        const cartas: Carta[] = []
        for(let i = 0; i < qtd; i++) {
            const carta = this._baralho.tirarCarta()
    
            this._jogadores[jogadorIndex].botarCarta(carta)

            cartas.push(carta)
        }

        return cartas
    }

    /**
     * Retira cartas da mão do jogador e coloca na pilha de descarte virada para cima
     */
    // TODO faz sentido retornar a lista de cartas descartadas?
    private descartarCarta(jogadorIndex: number, cartas: Carta[]): Carta[] {
        if(jogadorIndex !== this._currentJogador) { throw new Error('Não é a vez do jogador!') }

        try {
            // TODO é preciso verificar se as cartas realmente pertencem ao jogador
            // TODO validate move deveria retornar uma exceção com a mensagem
            if(this.pilhaDeDescarte.validateMove(cartas)) {
                
                // const cartasDescartadas: Carta[] = []
                for(let i = 0; i < cartas.length; i++) {
                    this._jogadores[jogadorIndex].tirarCarta(cartas[i])
                    this.pilhaDeDescarte.botarCarta(cartas[i])
                    // cartasDescartadas.push(cartas[i])
                }
    
                this.nextPlayer()
                return cartas
            } 

            throw new Error('Movimento não permitido!')
        } catch(error) {
            throw error
        }

    }

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

    // TODO o descartar deve receber uma lista de ids de cartas para descartar
    // TODO antes de cada movimento deve haver uma validação (de penalidades dos jogador corrente), as validações devem seguir o principio Open Closed, e englobar as cartas especiais
    public move({ jogadorIndex, moveType, cartas, qtd }: Move) {
        if(this._status !== StatusPartida.EM_ANDAMENTO) { throw new Error('A partida não está em andamento') }

        if (moveType === 'DESCARTAR') {
            return this.descartarCarta(jogadorIndex, cartas)
        } else if(moveType === 'PESCAR') {
            return this.pescarCartas(jogadorIndex, qtd)
        } 
    }

}