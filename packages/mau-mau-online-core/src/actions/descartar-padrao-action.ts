import { Action } from "../actions/ports/action";
import { Carta } from "../entities/carta";
import { Partida } from "../entities/partida";
import { StatusPartida } from "../entities/status-partida";

export type DescartarPadraoConfig = {
    jogadorId: string,
    cartasId: string[],
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
    // TODO devem haver variações dos movimentos (de penalidades dos jogador corrente), seguir o principio Open Closed, e englobar as cartas especiais
    public execute({ jogadorId, cartasId }: DescartarPadraoConfig): Carta[] {
        if(this.context.status !== StatusPartida.EM_ANDAMENTO) { throw new Error('A partida não está em andamento') }

        const jogador = this.context.getJogadorById(jogadorId)
        if(!jogador) {
            throw new Error('Não é a vez do jogador!') 
        }
        if(jogador.getId() !== this.context.getJogadores()[this.context.currentJogador].getId()) { 
            throw new Error('Não é a vez do jogador!') 
        }

        const cartas: Carta[] = cartasId
            .map(cartaId => jogador.getCartaById(cartaId))
            .filter(carta => carta !== null && carta !== undefined)
        
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
            const carta = jogador.tirarCarta(cartas[i])
            this.context.getPilhaDeDescarte().botarCarta(carta)
            cartasDescartadas.push(carta)
        }

        if(cartasDescartadas.length > 0) {
            this.context.notifyObservers({ tipo: 'descartar-padrao', dados: { jogadorId, cartas: cartasDescartadas } })
    
            if(!this.context.checkEnd()) {
                this.context.nextPlayer()
            }
        }
        return cartasDescartadas

    }

}