import { Action } from "../actions/ports/action";
import { Carta } from "../entities/carta";
import { Partida } from "../entities/partida";
import { StatusPartida } from "../entities/status-partida";

export type DescartarPadraoConfig = {
    jogadorIndex: number,
    cartas: Carta[],
}

/**
 * Retira cartas da mão do jogador e coloca na pilha de descarte virada para cima
 */
export class DescartarPadraoAction implements Action {
    private readonly context: Partida

    constructor(context: Partida) {
        this.context = context
    }

    // TODO faz sentido retornar a lista de cartas descartadas?
    // TODO é preciso verificar se as cartas realmente pertencem ao jogador?
    // TODO o descartar deve receber uma lista de ids de cartas para descartar?
    // TODO devem haver variações dos movimentos (de penalidades dos jogador corrente), seguir o principio Open Closed, e englobar as cartas especiais
    public execute({ jogadorIndex, cartas }: DescartarPadraoConfig): Carta[] {
        if(this.context.status !== StatusPartida.EM_ANDAMENTO) { throw new Error('A partida não está em andamento') }

        if(jogadorIndex !== this.context.currentJogador) { throw new Error('Não é a vez do jogador!') }

        if(cartas.length > 1) {
            if(!cartas.every((carta) => carta.naipe == cartas[0].naipe || carta.numero == cartas[0].numero)) {
                throw new Error('Ação não permitida: as cartas descartadas devem ser iguais (mesmo naipe e número)')
            }
        }

        // se a pilha de descarte não estiver vazia, só aceita cartas com o mesmo naipe ou numero do topo da pilha
        if(this.context.getPilhaDeDescarte().size() > 0) {
            if(!cartas.every((carta) => carta.naipe == this.context.getPilhaDeDescarte().peek().naipe || carta.numero == this.context.getPilhaDeDescarte().peek().numero)) {
                throw new Error('Ação não permitida: as cartas descartadas devem ter o mesmo naipe ou número da carta no topo da pilha de descarte')
            }
        }

        const cartasDescartadas: Carta[] = []
            for(let i = 0; i < cartas.length; i++) {
            const carta = this.context.getJogadores()[jogadorIndex].tirarCarta(cartas[i])
            this.context.getPilhaDeDescarte().botarCarta(carta)
            cartasDescartadas.push(carta)
        }

        this.context.notifyObservers({ tipo: 'descartar-padrao', dados: { jogadorIndex, cartas: cartasDescartadas } })

        if(!this.context.checkEnd()) {
            this.context.nextPlayer()
        }
        return cartasDescartadas

    }

}