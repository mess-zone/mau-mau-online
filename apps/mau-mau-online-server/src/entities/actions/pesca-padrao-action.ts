import { Partida } from "@/entities/partida";
import { Action } from "@/entities/action";
import { StatusPartida } from "@/entities/status-partida";
import { Carta } from "@/entities/carta";

export type PescaPadraoConfig = {
    jogadorIndex: number,
    qtd?: number,
}

export class PescaPadraoAction implements Action {
    private readonly context: Partida

    constructor(context: Partida) {
        this.context = context
    }

    public execute({ jogadorIndex, qtd = 1 }: PescaPadraoConfig): Carta[] {
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