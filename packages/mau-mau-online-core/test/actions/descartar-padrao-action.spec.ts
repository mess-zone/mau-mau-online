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
        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))

        expect(() => {  sut.execute({ jogadorId: '0', cartasId: [] }) }).toThrowError('A partida não está em andamento')
    })

    test('um jogador não pode jogar se não for a sua vez', () => {
        mockedCurrentJogador.mockReturnValue(1)
        mockedPartida.prototype.getJogadorById.mockReturnValue(undefined)

        expect(() => {  sut.execute({ jogadorId: '0', cartasId: [] }) }).toThrowError('Não é a vez do jogador')
    })

    test('um jogador pode descartar uma única carta', () => {
        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        
        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedJogador.prototype.getCartaById.mockReturnValue(carta)
        mockedJogador.prototype.tirarCarta.mockImplementationOnce(carta => carta)

        const result = sut.execute({ jogadorId: '0', cartasId: [carta.id] })

        expect(mockedPartida.prototype.getJogadorById).toHaveBeenCalled()
        expect(mockedJogador.prototype.getId).toHaveBeenCalled()
        expect(mockedJogador.prototype.getCartaById).toHaveBeenNthCalledWith(1, carta.id)
        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta)
        expect(result).toEqual([carta])

        expect(mockedPartida.prototype.notifyObservers).toHaveBeenCalledWith({ tipo: 'descartar-padrao', dados: { jogadorId: '0', cartas: [carta] } })

    })

    test('um jogador não pode descartar carta que não possui', () => {
        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedJogador.prototype.getCartaById.mockReturnValue(undefined)

        const result = sut.execute({ jogadorId: '0', cartasId: [carta.id] })

        expect(mockedJogador.prototype.getCartaById).toHaveBeenNthCalledWith(1, carta.id)
        expect(mockedJogador.prototype.tirarCarta).toHaveBeenCalledTimes(0)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenCalledTimes(0)
        expect(result).toEqual([])

        expect(mockedPartida.prototype.notifyObservers).toHaveBeenCalledTimes(0)

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
        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedJogador.prototype.getCartaById.mockReturnValueOnce(carta0).mockReturnValueOnce(carta1)
        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)


        const result = sut.execute({ jogadorId: '0', cartasId: [carta0.id, carta1.id] })

        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(2, carta1)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta0)
        expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(2, carta1)
        expect(result).toEqual([carta0, carta1])

        expect(mockedPartida.prototype.notifyObservers).toHaveBeenCalledWith({ tipo: 'descartar-padrao', dados: { jogadorId: '0', cartas: [carta0, carta1] } })

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

        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedJogador.prototype.getCartaById.mockReturnValueOnce(carta0).mockReturnValueOnce(carta1)
        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)

        expect(() => {  sut.execute({ jogadorId: '0', cartasId: [carta0.id, carta1.id] }) }).toThrowError('Ação não permitida: as cartas descartadas devem ser iguais (mesmo naipe e número)')
    })

    test('se a pilha estiver vazia, o jogador pode descartar qualquer carta', () => {
        mockedPilhaDeDescarte.prototype.size.mockReturnValue(0)
        mockedPilhaDeDescarte.prototype.peek.mockReturnValue(null)

        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedJogador.prototype.getCartaById.mockReturnValueOnce(carta)

        mockedJogador.prototype.tirarCarta.mockImplementationOnce(carta => carta)


        const result = sut.execute({ jogadorId: '0', cartasId: [carta.id] })

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

        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedPilhaDeDescarte.prototype.size.mockReturnValue(1)
        mockedPilhaDeDescarte.prototype.peek.mockReturnValue(cartaTopoPilha)
        
        const carta0 = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        
        mockedJogador.prototype.getCartaById.mockReturnValueOnce(carta0)
        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)


        const result = sut.execute({ jogadorId: '0', cartasId: [carta0.id] })

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
        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedPilhaDeDescarte.prototype.size.mockReturnValue(1)
        mockedPilhaDeDescarte.prototype.peek.mockReturnValue(cartaTopoPilha)

        const carta0 = {
            id: "c0",
            naipe: Naipe.Copas,
            numero: NumeroCarta.Rei
        }

        mockedJogador.prototype.getCartaById.mockReturnValueOnce(carta0)
        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)

        const result = sut.execute({ jogadorId: '0', cartasId: [carta0.id] })

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
        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedPilhaDeDescarte.prototype.size.mockReturnValue(1)
        mockedPilhaDeDescarte.prototype.peek.mockReturnValue(cartaTopoPilha)

        const carta0 = {
            id: "c0",
            naipe: Naipe.Copas,
            numero: NumeroCarta.As
        }

        mockedJogador.prototype.getCartaById.mockReturnValueOnce(carta0)
        mockedJogador.prototype.tirarCarta.mockImplementation(carta => carta)


        expect(() => {  sut.execute({ jogadorId: '0', cartasId: [carta0.id] }) }).toThrowError('Ação não permitida: as cartas descartadas devem ter o mesmo naipe ou número da carta no topo da pilha de descarte')

    })

    test('após descarta cartas, deve ser verificado se a partida acabou', () => {
        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedJogador.prototype.getCartaById.mockReturnValueOnce(carta)

        mockedJogador.prototype.tirarCarta.mockImplementationOnce(carta => carta)
        mockedPartida.prototype.checkEnd.mockReturnValueOnce(true)


        const result = sut.execute({ jogadorId: '0', cartasId: [carta.id] })

        expect(mockedPartida.prototype.checkEnd).toHaveBeenCalled()
        expect(mockedPartida.prototype.nextPlayer).toHaveBeenCalledTimes(0)
    })

    test('após descarta cartas, se a partida não acabou, a vez de jogar passa para o próximo jogador', () => {
        const carta = {
            id: "c0",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedPartida.prototype.getJogadorById.mockReturnValue(new Jogador(null))
        mockedJogador.prototype.getId.mockReturnValue('c0')
        mockedJogador.prototype.getCartaById.mockReturnValueOnce(carta)

        mockedJogador.prototype.tirarCarta.mockImplementationOnce(carta => carta)
        mockedPartida.prototype.checkEnd.mockReturnValueOnce(false)


        const result = sut.execute({ jogadorId: '0', cartasId: [carta.id] })

        expect(mockedPartida.prototype.checkEnd).toHaveBeenCalled()
        expect(mockedPartida.prototype.nextPlayer).toHaveBeenCalledTimes(1)
        // expect(mockedJogador.prototype.tirarCarta).toHaveBeenNthCalledWith(1, carta)
        // expect(mockedPilhaDeDescarte.prototype.botarCarta).toHaveBeenNthCalledWith(1, carta)
        // expect(result).toEqual([carta])
    })
})