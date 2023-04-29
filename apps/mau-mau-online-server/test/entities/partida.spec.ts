import { ArrayList } from "@/entities/array-list";
import { Baralho } from "@/entities/baralho";
import { Carta } from "@/entities/carta";
import { Jogador } from "@/entities/jogador";
import { Partida } from "@/entities/partida"
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Stack } from "@/entities/stack";

describe("Partida entity", () => {
    let partida: Partida

    beforeEach(() => {
        const stackBaralho = new Stack<Carta>()
        const baralho = new Baralho(stackBaralho)

        const stackDescarte = new Stack<Carta>()
        const pilhaDeDescarte = new PilhaDeDescarte(stackDescarte)

        const cartasJogador1 = new ArrayList<Carta>()
        const jogador1 = new Jogador(cartasJogador1)

        const cartasJogador2 = new ArrayList<Carta>()
        const jogador2 = new Jogador(cartasJogador2)

        const cartasJogador3 = new ArrayList<Carta>()
        const jogador3 = new Jogador(cartasJogador3)

        partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2, jogador3 ] })
    });

    test.todo('')

})