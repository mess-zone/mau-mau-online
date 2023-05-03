import { Carta } from "@/entities/carta";
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";
import { Stack } from "@/entities/stack";

jest.mock('../../src/entities/stack');
let mockedStack = jest.mocked(Stack);

describe("Pilha de Descarte entity", () => {
    let stack: Stack<Carta>;
    let sut: PilhaDeDescarte;

    beforeEach(() => {
        jest.clearAllMocks()
        stack = new Stack<Carta>();
        sut = new PilhaDeDescarte(stack);
    });

    test('deve retornar quantas cartas existem na pilha', () => {
        mockedStack.prototype.size.mockReturnValueOnce(52)
        expect(sut.size()).toBe(52)
    })

    test('deve visualizar a carta no topo da pilha', () => {
        const cartaTopo: Carta = {
            id: 'id0',
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedStack.prototype.peek.mockReturnValueOnce(cartaTopo)

        expect(sut.peek()).toBe(cartaTopo)
    })

    test("deve botar uma carta qualquer no topo da pilha", () => {
        const carta: Carta = {
            id: 'id0',
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        sut.botarCarta(carta)
        expect(mockedStack.prototype.push).toHaveBeenCalledWith(carta)
    })

    test("deve limpar a pilha e retornar as cartas retiradas, mantendo apenas a última carta no topo da pilha, se houver", () => {
        const cartas: Carta[] = [
            {
                id: 'id0',
                naipe: Naipe.Espadas,
                numero: NumeroCarta.As
            },
            {
                id: 'id1',
                naipe: Naipe.Copas,
                numero: NumeroCarta.Quatro
            },
            {
                id: 'id2',
                naipe: Naipe.Ouros,
                numero: NumeroCarta.Rainha
            },
        ]
        mockedStack.prototype.pop.mockReturnValue(cartas[2])
        mockedStack.prototype.clear.mockReturnValue([cartas[0], cartas[1]])

        const cleared = sut.clear()
        expect(mockedStack.prototype.pop).toHaveBeenCalled()
        expect(mockedStack.prototype.clear).toHaveBeenCalled()
        expect(mockedStack.prototype.push).toHaveBeenCalledWith(cartas[2])
        expect(cleared).toEqual([cartas[0], cartas[1]])
    })

    test("deve limpar a pilha e retornar um array vazio, se houver apenas 1 carta na pilha", () => {
        const cartas: Carta[] = [
            {
                id: 'id0',
                naipe: Naipe.Espadas,
                numero: NumeroCarta.As
            },
        ]
        mockedStack.prototype.pop.mockReturnValue(cartas[0])
        mockedStack.prototype.clear.mockReturnValue([])

        const cleared = sut.clear()
        expect(mockedStack.prototype.pop).toHaveBeenCalled()
        expect(mockedStack.prototype.clear).toHaveBeenCalled()
        expect(mockedStack.prototype.push).toHaveBeenCalledWith(cartas[0])
        expect(cleared).toEqual([])
    })

    test("deve limpar a pilha e retornar um array vazio, se houver não houver cartas na pilha", () => {
        const cartas: Carta[] = []
        mockedStack.prototype.pop.mockReturnValue(undefined)
        mockedStack.prototype.clear.mockReturnValue([])

        const cleared = sut.clear()
        expect(mockedStack.prototype.pop).toHaveBeenCalled()
        expect(mockedStack.prototype.clear).toHaveBeenCalled()
        expect(mockedStack.prototype.push).toHaveBeenCalledTimes(0)
        expect(cleared).toEqual([])
    })

})