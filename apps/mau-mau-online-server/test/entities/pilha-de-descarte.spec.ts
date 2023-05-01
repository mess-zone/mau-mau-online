import { Carta } from "@/entities/carta";
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";
import { FakeStack } from "@test/doubles/fake-stack";

describe("Pilha de Descate entity", () => {
    let fakeStack: FakeStack<Carta>;
    let mesa: PilhaDeDescarte;

    beforeEach(() => {
        fakeStack = new FakeStack<Carta>();
        mesa = new PilhaDeDescarte(fakeStack);
    });

    test("deve iniciar vazio de cartas", () => {
       expect(mesa.size()).toBe(0)
    })

    test('deve retornar quantas cartas existem na pilha', () => {
        const stackSize = fakeStack.size()
        expect(mesa.size()).toBe(stackSize)
    })

    test('deve visualizar a carta no topo da pilha', () => {
        expect(mesa.peek()).toBeUndefined()

        const carta: Carta = {
            id: 'id0',
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        mesa.botarCarta(carta)
        expect(mesa.peek()).toBe(carta)
    })

    test("deve botar uma carta qualquer no topo da pilha", () => {
        expect(mesa.size()).toBe(0)
        const carta: Carta = {
            id: 'id0',
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        mesa.botarCarta(carta)
        expect(mesa.size()).toBe(1)
        expect(fakeStack.peek()).toBe(carta)
    })

})