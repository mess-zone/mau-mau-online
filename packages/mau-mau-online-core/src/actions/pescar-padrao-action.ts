import { Partida } from "../entities/partida";
import { Action } from "../actions/ports/action";
import { StatusPartida } from "../entities/status-partida";
import { Carta } from "../entities/carta";

export type PescarPadraoConfig = {
    jogadorId: string,
    qtd?: number,
}

/**
 * Retira cartas do baralho virado para baixo e coloca na mão de um jogador
 */
export class PescarPadraoAction implements Action {
    private readonly context: Partida

    constructor(context: Partida) {
        this.context = context
    }

    public execute({ jogadorId, qtd = 1 }: PescarPadraoConfig): Carta[] {
        if(this.context.status !== StatusPartida.EM_ANDAMENTO) { throw new Error('A partida não está em andamento') }
        
        const jogador = this.context.getJogadorById(jogadorId)
        if(!jogador) {
            throw new Error('Não é a vez do jogador!') 
        }
        if(jogador.getId() !== this.context.getJogadores()[this.context.currentJogador].getId()) { 
            throw new Error('Não é a vez do jogador!') 
        }

        if (this.context.getBaralho().size() < qtd) { 
            this.context.refillBaralho()
            if(this.context.getBaralho().size() < qtd) {
                throw new Error('Não há cartas suficientes disponíveis no baralho!') 
            }
        } 
        
        const cartas: Carta[] = []
        for(let i = 0; i < qtd; i++) {
            const carta = this.context.getBaralho().tirarCarta()
            jogador.botarCarta(carta)
            cartas.push(carta)
        }
        
        this.context.notifyObservers({ tipo: 'pescar-padrao', dados: { jogadorId, cartas } })
        
        if(!this.context.checkEnd()) {
            if (this.context.getBaralho().size() < qtd) { 
                this.context.refillBaralho()
            } 
        }
        return cartas
    }
}