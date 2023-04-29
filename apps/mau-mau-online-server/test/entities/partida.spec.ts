import { ArrayList } from "@/entities/array-list";
import { Baralho } from "@/entities/baralho";
import { Carta } from "@/entities/carta";
import { Jogador } from "@/entities/jogador";
import { Partida } from "@/entities/partida"
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Stack } from "@/entities/stack";
import { StatusPartida } from "@/entities/status-partida";

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

    test('deve iniciar partida se houver ao menos 2 jogadores', () => {
        expect(partida.status).toBe(StatusPartida.PENDENTE)
        
        expect(partida.jogadores[0].size()).toBe(0)
        expect(partida.jogadores[1].size()).toBe(0)
        expect(partida.jogadores[2].size()).toBe(0)
        
        const started = partida.start()

        // atualiza o status para EM ANDAMENTO
        expect(started).toBeTruthy()
        expect(partida.status).toBe(StatusPartida.EM_ANDAMENTO)
        expect(partida.currentJogador).toBe(0)

        // distribui as cartas do baralho
        expect(partida.jogadores[0].size()).toBe(7)
        expect(partida.jogadores[1].size()).toBe(7)
        expect(partida.jogadores[2].size()).toBe(7)
        expect(partida.baralho.size()).toBe(52 - (7 * 3))


    })

    test('não deve iniciar partida se não houver ao menos 2 jogadores', () => {
        const stackBaralho = new Stack<Carta>()
        const baralho = new Baralho(stackBaralho)

        const stackDescarte = new Stack<Carta>()
        const pilhaDeDescarte = new PilhaDeDescarte(stackDescarte)

        const cartasJogador1 = new ArrayList<Carta>()
        const jogador1 = new Jogador(cartasJogador1)
        partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1 ] })

        expect(partida.status).toBe(StatusPartida.PENDENTE)
        const started = partida.start()
        expect(started).toBeFalsy()
        expect(partida.status).toBe(StatusPartida.PENDENTE)

        expect(partida.baralho.size()).toBe(52)

    })

    test('deve cancelar partida', () => {
        partida.start()
        expect(partida.status).toBe(StatusPartida.EM_ANDAMENTO)

        partida.cancel()
        expect(partida.status).toBe(StatusPartida.CANCELADA)
        
        
    })
    test.todo('should end partida')

})