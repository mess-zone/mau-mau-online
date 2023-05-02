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

})