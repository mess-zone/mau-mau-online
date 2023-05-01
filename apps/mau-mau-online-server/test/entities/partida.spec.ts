import { ArrayList } from "@/entities/array-list";
import { Baralho } from "@/entities/baralho";
import { Carta } from "@/entities/carta";
import { Jogador } from "@/entities/jogador";
import { Partida } from "@/entities/partida"
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Stack } from "@/entities/stack";
import { StatusPartida } from "@/entities/status-partida";
import { FakeStack } from "@test/doubles/fake-stack";

// TODO mock all entities, excepr Partida...
jest.mock('../doubles/fake-stack');

let mockedFakeStack = jest.mocked(FakeStack);

describe("Partida entity", () => {
    let partida: Partida

    let stackBaralho: Stack<Carta>
    let baralho: Baralho

    let stackDescarte: Stack<Carta>
    let pilhaDeDescarte: PilhaDeDescarte

    let cartasJogador1: ArrayList<Carta>
    let jogador1: Jogador

    let cartasJogador2: ArrayList<Carta>
    let jogador2: Jogador

    let cartasJogador3: ArrayList<Carta>
    let jogador3: Jogador

    beforeEach(() => {
        mockedFakeStack.mockClear()
        stackBaralho = new Stack<Carta>()
        baralho = new Baralho(stackBaralho)

        stackDescarte = new Stack<Carta>()
        pilhaDeDescarte = new PilhaDeDescarte(stackDescarte)

        cartasJogador1 = new ArrayList<Carta>()
        jogador1 = new Jogador(cartasJogador1)

        cartasJogador2 = new ArrayList<Carta>()
        jogador2 = new Jogador(cartasJogador2)

        cartasJogador3 = new ArrayList<Carta>()
        jogador3 = new Jogador(cartasJogador3)

        partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2, jogador3 ] })
    });

    test('deve iniciar partida se houver ao menos 2 jogadores', () => {
        expect(partida.status).toBe(StatusPartida.PENDENTE)
        
        expect(partida.getJogadores()[0].size()).toBe(0)
        expect(partida.getJogadores()[1].size()).toBe(0)
        expect(partida.getJogadores()[2].size()).toBe(0)

        expect(partida.currentJogador).toBe(-1)
        
        const started = partida.start()

        // atualiza o status para EM ANDAMENTO
        expect(started).toBeTruthy()
        expect(partida.status).toBe(StatusPartida.EM_ANDAMENTO)
        expect(partida.currentJogador).toBe(0)

        // distribui as cartas do baralho
        expect(partida.getJogadores()[0].size()).toBe(7)
        expect(partida.getJogadores()[1].size()).toBe(7)
        expect(partida.getJogadores()[2].size()).toBe(7)
        expect(partida.getBaralho().size()).toBe(52 - (7 * 3))


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

        expect(partida.getBaralho().size()).toBe(52)

    })

    test('deve cancelar partida', () => {
        partida.start()
        expect(partida.status).toBe(StatusPartida.EM_ANDAMENTO)

        partida.cancel()
        expect(partida.status).toBe(StatusPartida.CANCELADA)
        
        
    })

    test('deve passar a vez para o próximo jogador', () => {
        partida.start()
        expect(partida.currentJogador).toBe(0)
        partida.nextPlayer()
        expect(partida.currentJogador).toBe(1)
        partida.nextPlayer()
        expect(partida.currentJogador).toBe(2)
        partida.nextPlayer()
        expect(partida.currentJogador).toBe(0)
    })

    test.todo('should end partida')

})