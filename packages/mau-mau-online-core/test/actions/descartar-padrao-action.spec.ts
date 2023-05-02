import { DescartarPadraoAction } from "@/actions/descartar-padrao-action";
import { Jogador } from "@/entities/jogador";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";
import { Partida } from "@/entities/partida"
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { StatusPartida } from "@/entities/status-partida";

jest.mock('../../src/entities/partida');
jest.mock('../../src/entities/pilha-de-descarte');
jest.mock('../../src/entities/jogador');
let mockedPartida = jest.mocked(Partida);
let mockedPilhaDeDescarte = jest.mocked(PilhaDeDescarte);
let mockedJogador = jest.mocked(Jogador);

mockedPartida.prototype.getPilhaDeDescarte.mockReturnValue(new PilhaDeDescarte(null))
mockedPartida.prototype.getJogadores.mockReturnValue([ new Jogador(null) ])

let mockedStatus: jest.Mock<StatusPartida>
let mockedCurrentJogador: jest.Mock<number>

describe("Descartar Padrão (Action)", () => {
    let partida: Partida
    let sut: DescartarPadraoAction

    beforeEach(() => {
        jest.clearAllMocks()

        mockedStatus = jest.fn(() => StatusPartida.EM_ANDAMENTO)
        mockedCurrentJogador = jest.fn(() => 0)

        partida = new Partida(null)
        sut = new DescartarPadraoAction(partida)

        Object.defineProperty(partida, 'status', {
            get: mockedStatus,
            set: jest.fn(),
        });

        Object.defineProperty(partida, 'currentJogador', {
            get: mockedCurrentJogador,
            set: jest.fn(),
        });
    })

    test('um jogador não pode jogar se a partida não estiver em andamento', () => {
        mockedStatus.mockReturnValue(StatusPartida.CANCELADA)

        expect(() => {  sut.execute({ jogadorIndex: 0, cartas: [] }) }).toThrowError('A partida não está em andamento')
    })

    test('um jogador não pode jogar se não for a sua vez', () => {
        mockedCurrentJogador.mockReturnValue(1)

        expect(() => {  sut.execute({ jogadorIndex: 0, cartas: [] }) }).toThrowError('Não é a vez do jogador')
    })

    test.todo('um jogador não pode descartar cartas que não possui / se não houver cartas suficientes')

    test('um jogador pode descartar uma única carta', () => {
        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedJogador.prototype.tirarCarta.mockImplementationOnce(carta => carta)


        const result = sut.execute({ jogadorIndex: 0, cartas: [carta] })

        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta)
        expect(result).toEqual([carta])
    })

    test('um jogador pode descartar mais de uma carta, se elas forem todas iguais (naipe e número)', () => {
        const carta0 = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        const carta1 = {
            id: "c1",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)


        const result = sut.execute({ jogadorIndex: 0, cartas: [carta0, carta1] })

        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(2, carta1)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(2, carta1)
        expect(result).toEqual([carta0, carta1])
    })

    test('um jogador não pode descartar mais de uma carta, se elas forem diferentes', () => {
        const carta0 = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        const carta1 = {
            id: "c1",
            naipe: Naipe.Ouros,
            numero: NumeroCarta.Dez
        }
        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)

        expect(() => {  sut.execute({ jogadorIndex: 0, cartas: [carta0, carta1] }) }).toThrowError('Ação não permitida: as cartas descartadas devem ser iguais (mesmo naipe e número)')
    })

    test('se a pilha estiver vazia, o jogador pode descartar qualquer carta', () => {
        mockedPilhaDeDescarte.prototype.size.mockReturnValue(0)
        mockedPilhaDeDescarte.prototype.peek.mockReturnValue(null)

        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedJogador.prototype.tirarCarta.mockImplementationOnce(carta => carta)


        const result = sut.execute({ jogadorIndex: 0, cartas: [carta] })

        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta)
        expect(result).toEqual([carta])
    })

    test('o jogador pode descartar cartas como o mesmo naipe do topo da pilha', () => {
        const cartaTopoPilha = {
            id: "topo",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.Rei
        }
        mockedPilhaDeDescarte.prototype.size.mockReturnValue(1)
        mockedPilhaDeDescarte.prototype.peek.mockReturnValue(cartaTopoPilha)

        const carta0 = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)


        const result = sut.execute({ jogadorIndex: 0, cartas: [carta0] })

        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(result).toEqual([carta0])
    })

    test('o jogador pode descartar cartas como o mesmo número do topo da pilha', () => {
        const cartaTopoPilha = {
            id: "topo",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.Rei
        }
        mockedPilhaDeDescarte.prototype.size.mockReturnValue(1)
        mockedPilhaDeDescarte.prototype.peek.mockReturnValue(cartaTopoPilha)

        const carta0 = {
            id: "c0",
            naipe: Naipe.Copas,
            numero: NumeroCarta.Rei
        }

        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)

        const result = sut.execute({ jogadorIndex: 0, cartas: [carta0] })

        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(result).toEqual([carta0])
    })

    test('o jogador não pode descartar cartas como número e naipe diferente do topo da pilha', () => {
        const cartaTopoPilha = {
            id: "topo",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.Rei
        }
        mockedPilhaDeDescarte.prototype.size.mockReturnValue(1)
        mockedPilhaDeDescarte.prototype.peek.mockReturnValue(cartaTopoPilha)

        const carta0 = {
            id: "c0",
            naipe: Naipe.Copas,
            numero: NumeroCarta.As
        }

        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)


        expect(() => {  sut.execute({ jogadorIndex: 0, cartas: [carta0] }) }).toThrowError('Ação não permitida: as cartas descartadas devem ter o mesmo naipe ou número da carta no topo da pilha de descarte')

    })

    test('após descarta cartas, deve ser verificado se a partida acabou', () => {
        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedJogador.prototype.tirarCarta.mockImplementationOnce(carta => carta)
        mockedPartida.prototype.checkEnd.mockReturnValueOnce(true)


        const result = sut.execute({ jogadorIndex: 0, cartas: [carta] })

        expect(mockedPartida.prototype.checkEnd).toHaveBeenCalled()
        expect(mockedPartida.prototype.nextPlayer).toHaveBeenCalledTimes(0)
    })

    test('após descarta cartas, se a partida não acabou, a vez de jogar passa para o próximo jogador', () => {
        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedJogador.prototype.tirarCarta.mockImplementationOnce(carta => carta)
        mockedPartida.prototype.checkEnd.mockReturnValueOnce(false)


        const result = sut.execute({ jogadorIndex: 0, cartas: [carta] })

        expect(mockedPartida.prototype.checkEnd).toHaveBeenCalled()
        expect(mockedPartida.prototype.nextPlayer).toHaveBeenCalledTimes(1)
        // expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta)
        // expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta)
        // expect(result).toEqual([carta])
    })
})