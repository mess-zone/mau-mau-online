import { Carta } from "@/entities";
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
    let notifyObservers: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()

        baralho = new Baralho(null)
        pilhaDeDescarte = new PilhaDeDescarte(null)
        jogador1 = new Jogador(null)
        jogador2 = new Jogador(null)
        jogador3 = new Jogador(null)

        sut = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2, jogador3 ] })
        notifyObservers = jest.fn();
        sut.notifyObservers = notifyObservers; 
    });

    test('deve preencher o baralho novamente com as cartas da pilha de descarte embaralhadas', () => {
        const cartas: Carta[] = [
            {
                id: 'carta0',
                naipe: Naipe.Copas,
                numero: NumeroCarta.Cinco,
            },
            {
                id: 'carta1',
                naipe: Naipe.Espadas,
                numero: NumeroCarta.Dez,
            },
        ]
        mockedPilhaDeDescarte.prototype.clear.mockReturnValueOnce(cartas)

        sut.refillBaralho()

        expect(mockedPilhaDeDescarte.prototype.clear).toBeCalled()
        expect(mockedBaralho.prototype.refill).toBeCalledWith(cartas)
        expect(notifyObservers).toHaveBeenCalledWith({ tipo: 'refill', dados: { cartas } })
    })

    test('não deve iniciar partida se não estiver pendente', () => {
        mockedJogador.prototype.isActive.mockReturnValue(true)

        sut.cancel()

        expect(sut.status).toBe(StatusPartida.CANCELADA)
        const started = sut.start()
        expect(started).toBeFalsy()
        expect(sut.status).toBe(StatusPartida.CANCELADA)
    })

    test('deve iniciar partida se estiver pendente', () => {
        mockedJogador.prototype.isActive.mockReturnValue(true)

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
        expect(notifyObservers).toHaveBeenCalledWith({ tipo: 'start', dados: {} })
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
        expect(notifyObservers).toHaveBeenCalledWith({ tipo: 'cancel', dados: {} })

    })

    test('deve passar a vez para o próximo jogador ativo', () => {
        mockedJogador.prototype.isActive.mockReturnValue(true)

        sut.start()
        expect(sut.currentJogador).toBe(0)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(1)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(2)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(0)
        
        expect(notifyObservers).toHaveBeenNthCalledWith(2, { tipo: 'next-player', dados: { jogadorIndex: 0 } })
        expect(notifyObservers).toHaveBeenNthCalledWith(3, { tipo: 'next-player', dados: { jogadorIndex: 1 } })
        expect(notifyObservers).toHaveBeenNthCalledWith(4, { tipo: 'next-player', dados: { jogadorIndex: 2 } })
        expect(notifyObservers).toHaveBeenNthCalledWith(5, { tipo: 'next-player', dados: { jogadorIndex: 0 } })

    })

    test('deve pular a vez de um jogador inativo', () => {
        mockedJogador.prototype.isActive.mockReturnValueOnce(true)
            .mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValueOnce(true)

        sut.start()
        expect(sut.currentJogador).toBe(0)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(1)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(0)
        
        expect(mockedJogador.prototype.isActive).toBeCalledTimes(4)
        expect(notifyObservers).toHaveBeenNthCalledWith(1, { tipo: 'start', dados: { } })
        expect(notifyObservers).toHaveBeenNthCalledWith(2, { tipo: 'next-player', dados: { jogadorIndex: 0 } })
        expect(notifyObservers).toHaveBeenNthCalledWith(3, { tipo: 'next-player', dados: { jogadorIndex: 1 } })
        expect(notifyObservers).toHaveBeenNthCalledWith(4, { tipo: 'next-player', dados: { jogadorIndex: 0 } })
    })

    test('não deve passar a vez se tiver apenas um jogador ativo ou se todos os jogadores estão inativos', () => {
        mockedJogador.prototype.isActive.mockReturnValueOnce(true)
            .mockReturnValueOnce(false).mockReturnValueOnce(false)

        sut.start()
        expect(sut.currentJogador).toBe(0)
        sut.nextPlayer()
        expect(sut.currentJogador).toBe(0)
        
        expect(mockedJogador.prototype.isActive).toBeCalledTimes(3)
        expect(notifyObservers).toHaveBeenNthCalledWith(2, { tipo: 'next-player', dados: { jogadorIndex: 0 } })
        expect(notifyObservers).toHaveBeenCalledTimes(2)
    })

    test('não deve finalizar a partida quando os jogadores ainda tem cartas na mão', () => {
        sut.start()
        expect(sut.currentJogador).toBe(0)
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)

        mockedJogador.prototype.size.mockReturnValue(4)
        mockedBaralho.prototype.size.mockReturnValue(10)
        const isEnded = sut.checkEnd()

        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)
        expect(isEnded).toBe(false)

    })

    test('deve finalizar a partida quando um jogador não tiver mais cartas', () => {
        sut.start()
        expect(sut.currentJogador).toBe(0)
        expect(sut.status).toBe(StatusPartida.EM_ANDAMENTO)

        mockedJogador.prototype.size.mockReturnValue(0)
        mockedBaralho.prototype.size.mockReturnValue(10)
        const isEnded = sut.checkEnd()

        expect(sut.status).toBe(StatusPartida.FINALIZADA)
        expect(isEnded).toBe(true)
        expect(notifyObservers).toHaveBeenCalledWith({ tipo: 'finalized', dados: { winner: 0 } })
    })

})