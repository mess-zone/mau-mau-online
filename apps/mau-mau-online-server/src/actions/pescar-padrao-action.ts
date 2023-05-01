import { Partida } from "@/entities/partida";
import { Action } from "@/actions/ports/action";
import { StatusPartida } from "@/entities/status-partida";
import { Carta } from "@/entities/carta";

export type PescarPadraoConfig = {
    jogadorIndex: number,
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

    public execute({ jogadorIndex, qtd = 1 }: PescarPadraoConfig): Carta[] {
        if(this.context.status !== StatusPartida.EM_ANDAMENTO) { throw new Error('A partida não está em andamento') }
        
        if(jogadorIndex !== this.context.currentJogador) { throw new Error('Não é a vez do jogador!') }

        if (this.context.getBaralho().size() < qtd ) { throw new Error('Não há cartas suficientes disponíveis no baralho!') }

        const cartas: Carta[] = []
        for(let i = 0; i < qtd; i++) {
            const carta = this.context.getBaralho().tirarCarta()
            this.context.getJogadores()[jogadorIndex].botarCarta(carta)
            cartas.push(carta)
        }

        return cartas
    }
}