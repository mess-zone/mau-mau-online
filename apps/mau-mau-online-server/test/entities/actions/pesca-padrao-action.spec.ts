import { PescaPadraoAction } from "@/entities/actions/pesca-padrao-action";
import { Baralho } from "@/entities/baralho";
import { Jogador } from "@/entities/jogador";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";
import { Partida } from "@/entities/partida"
import { StatusPartida } from "@/entities/status-partida";

jest.mock('../../../src/entities/partida');
jest.mock('../../../src/entities/baralho');
jest.mock('../../../src/entities/jogador');
let mockedPartida = jest.mocked(Partida);
let mockedBaralho = jest.mocked(Baralho);
let mockedJogador = jest.mocked(Jogador);

mockedPartida.prototype.getBaralho.mockReturnValue(new Baralho(null))
mockedPartida.prototype.getJogadores.mockReturnValue([ new Jogador(null) ])

describe("Pesca Padrão (Action)", () => {
    let partida: Partida
    let sut: PescaPadraoAction

    beforeEach(() => {
        jest.clearAllMocks()

        partida = new Partida(null)
        sut = new PescaPadraoAction(partida)
    })

    test('um jogador não pode jogar se a partida não estiver em andamento', () => {
        Object.defineProperty(partida, 'status', {
            get: jest.fn(() => StatusPartida.CANCELADA),
            set: jest.fn()
        });

        expect(() => {  sut.execute({ jogadorIndex: 0 }) }).toThrowError('A partida não está em andamento')
    })

    test('um jogador não pode jogar se não for a sua vez', () => {
        Object.defineProperty(partida, 'status', {
            get: jest.fn(() => StatusPartida.EM_ANDAMENTO),
            set: jest.fn()
        });

        expect(() => {  sut.execute({ jogadorIndex: 1 }) }).toThrowError('Não é a vez do jogador')
    })

    test('um jogador não pode pescar cartas do baralho, se não houver cartas suficientes no baralho', () => {
        Object.defineProperty(partida, 'status', {
            get: jest.fn(() => StatusPartida.EM_ANDAMENTO),
            set: jest.fn()
        });

        Object.defineProperty(partida, 'currentJogador', {
            get: jest.fn(() => 0),
            set: jest.fn()
        });

        mockedBaralho.prototype.size.mockReturnValueOnce(2)

        expect(() => {  sut.execute({ jogadorIndex: 0, qtd: 4 }) }).toThrowError('Não há cartas suficientes disponíveis no baralho!')

    })

    test('um jogador pode pescar uma única carta do baralho', () => {
        Object.defineProperty(partida, 'status', {
            get: jest.fn(() => StatusPartida.EM_ANDAMENTO),
            set: jest.fn()
        });

        Object.defineProperty(partida, 'currentJogador', {
            get: jest.fn(() => 0),
            set: jest.fn()
        });

        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedBaralho.prototype.tirarCarta.mockReturnValueOnce(carta)

        const result = sut.execute({ jogadorIndex: 0 })

        expect(mockedBaralho.prototype.tirarCarta).toHaveBeenCalledTimes(1)
        expect(mockedJogador.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta)
        expect(result).toEqual([carta])
    })

    test('um jogador pode pescar mais de uma carta do baralho', () => {
        Object.defineProperty(partida, 'status', {
            get: jest.fn(() => StatusPartida.EM_ANDAMENTO),
            set: jest.fn()
        });

        Object.defineProperty(partida, 'currentJogador', {
            get: jest.fn(() => 0),
            set: jest.fn()
        });

        const carta0 = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        const carta1 = {
            id: "c1",
            naipe: Naipe.Copas,
            numero: NumeroCarta.Quatro
        }
        mockedBaralho.prototype.tirarCarta.mockReturnValueOnce(carta0).mockReturnValueOnce(carta1)

        const result = sut.execute({ jogadorIndex: 0, qtd: 2 })

        expect(mockedBaralho.prototype.tirarCarta).toHaveBeenCalledTimes(2)
        expect(mockedJogador.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(mockedJogador.prototype.botarCarta).toHaveBeenNthCalledWith(2, carta1)
        expect(result).toEqual([carta0, carta1])
    })

    test('após pescar cartas, o jogador não passa a vez', () => {
        Object.defineProperty(partida, 'status', {
            get: jest.fn(() => StatusPartida.EM_ANDAMENTO),
            set: jest.fn()
        });

        Object.defineProperty(partida, 'currentJogador', {
            get: jest.fn(() => 0),
            set: jest.fn()
        });

        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedBaralho.prototype.tirarCarta.mockReturnValueOnce(carta)

        const result = sut.execute({ jogadorIndex: 0 })

        expect(mockedPartida.prototype.nextPlayer).toHaveBeenCalledTimes(0)
        expect(mockedBaralho.prototype.tirarCarta).toHaveBeenCalledTimes(1)
        expect(mockedJogador.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta)
        expect(result).toEqual([carta])
    })
})