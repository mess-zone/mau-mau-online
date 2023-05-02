import { Baralho } from "@/entities/baralho";
import { Jogador } from "@/entities/jogador";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";
import { Partida } from "@/entities/partida"
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { StatusPartida } from "@/entities/status-partida";

jest.mock('../../src/entities/baralho');
jest.mock('../../src/entities/pilha-de-descarte');
jest.mock('../../src/entities/jogador');
let mockedBaralho = jest.mocked(Baralho);
let mockedPilhaDeDescarte = jest.mocked(PilhaDeDescarte);
let mockedJogador = jest.mocked(Jogador);

describe("Partida entity", () => {
    let baralho: Baralho
    let pilhaDeDescarte: PilhaDeDescarte
    let jogador1: Jogador
    let jogador2: Jogador
    let jogador3: Jogador

    let sut: Partida

    beforeEach(() => {
        jest.clearAllMocks()

        baralho = new Baralho(null)
        pilhaDeDescarte = new PilhaDeDescarte(null)
        jogador1 = new Jogador(null)
        jogador2 = new Jogador(null)
        jogador3 = new Jogador(null)

        sut = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2, jogador3 ] })
    });

    test('não deve iniciar partida se não estiver pendente', () => {
        sut.cancel()

        expect(sut.status).toBe(StatusPartida.CANCELADA)
        const started = sut.start()
        expect(started).toBeFalsy()
        expect(sut.status).toBe(StatusPartida.CANCELADA)
    })

    test('deve iniciar partida se estiver pendente', () => {
        const carta = {
            id: 'carta',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }
        mockedBaralho.prototype.tirarCarta.mockReturnValue(carta)

        expect(sut.status).toBe(StatusPartida.PENDENTE)
        expect(sut.currentJogador).toBe(-1)
        
        const started = sut.start()

        // atualiza o status para EM ANDAMENTO
        expect(started).toBeTruthy()
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)
        expect(sut.currentJogador).toBe(0)

        // distribui as cartas do baralho
        expect(mockedBaralho.prototype.tirarCarta).toHaveBeenCalledTimes(7 * 3)
        expect(mockedJogador.mock.instances[0].botarCarta).toHaveBeenCalledTimes(7)
        expect(mockedJogador.mock.instances[1].botarCarta).toHaveBeenCalledTimes(7)
        expect(mockedJogador.mock.instances[2].botarCarta).toHaveBeenCalledTimes(7)
        // expect(mockedJogador.prototype.botarCarta).toHaveBeenCalledWith(carta)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenCalledTimes(0)
    })

    test('deve iniciar partida se houver ao menos 2 jogadores', () => {
        const carta = {
            id: 'carta',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }
        mockedBaralho.prototype.tirarCarta.mockReturnValue(carta)

        expect(sut.status).toBe(StatusPartida.PENDENTE)
        expect(sut.currentJogador).toBe(-1)
        
        const started = sut.start()

        // atualiza o status para EM ANDAMENTO
        expect(started).toBeTruthy()
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)
        expect(sut.currentJogador).toBe(0)

        // distribui as cartas do baralho
        expect(mockedBaralho.prototype.tirarCarta).toHaveBeenCalledTimes(7 * 3)
        expect(mockedJogador.mock.instances[0].botarCarta).toHaveBeenCalledTimes(7)
        expect(mockedJogador.mock.instances[1].botarCarta).toHaveBeenCalledTimes(7)
        expect(mockedJogador.mock.instances[2].botarCarta).toHaveBeenCalledTimes(7)
        // expect(mockedJogador.prototype.botarCarta).toHaveBeenCalledWith(carta)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenCalledTimes(0)

    })

    test('não deve iniciar partida se não houver ao menos 2 jogadores', () => {
        sut = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1 ] })

        expect(sut.status).toBe(StatusPartida.PENDENTE)
        const started = sut.start()
        expect(started).toBeFalsy()
        expect(sut.status).toBe(StatusPartida.PENDENTE)
    })

    test('deve cancelar partida', () => {
        sut.start()
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)

        sut.cancel()
        expect(sut.status).toBe(StatusPartida.CANCELADA) 
    })

    test('deve passar a vez para o próximo jogador', () => {
        sut.start()
        expect(sut.currentJogador).toBe(0)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(1)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(2)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(0)
    })

    test('não deve finalizar a partida quando os jogadores ainda tem cartas na mão', () => {
        sut.start()
        expect(sut.currentJogador).toBe(0)
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)

        mockedJogador.prototype.size.mockReturnValue(0)
        const isEnded = sut.checkEnd()

        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)
        expect(isEnded).toBe(false)

    })

    test('deve finalizar a partida quando um jogador não tiver mais cartas', () => {
        sut.start()
        expect(sut.currentJogador).toBe(0)
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)

        mockedJogador.prototype.size.mockReturnValue(0)
        const isEnded = sut.checkEnd()

        expect(sut.status).toBe(StatusPartida.FINALIZADA)
        expect(isEnded).toBe(true)

    })

    test('deve finalizar a partida quando o baralho não tiver mais cartas', () => {
        sut.start()
        expect(sut.currentJogador).toBe(0)
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)

        mockedJogador.prototype.size.mockReturnValue(10)
        mockedBaralho.prototype.size.mockReturnValue(0)
        const isEnded = sut.checkEnd()

        expect(sut.status).toBe(StatusPartida.FINALIZADA)
        expect(isEnded).toBe(true)
    })

    test('não deve finalizar a partida quando o baralho ainda tiver cartas', () => {
        sut.start()
        expect(sut.currentJogador).toBe(0)
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)

        mockedJogador.prototype.size.mockReturnValue(10)
        mockedBaralho.prototype.size.mockReturnValue(0)
        const isEnded = sut.checkEnd()

        expect(sut.status).toBe(StatusPartida.FINALIZADA)
        expect(isEnded).toBe(false)
    })

    test.todo('indicar o ganhador da partida')

})