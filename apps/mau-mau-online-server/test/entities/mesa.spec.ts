import { Carta } from "@/entities/carta";
import { Mesa } from "@/entities/mesa";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";
import { FakeStack } from "@test/doubles/fake-stack";

describe("Mesa entity", () => {
    let fakeStack: FakeStack<Carta>;
    let mesa: Mesa;

    beforeEach(() => {
        fakeStack = new FakeStack<Carta>();
        mesa = new Mesa(fakeStack);
    });

    test("deve iniciar vazio de cartas", () => {
       expect(fakeStack.isEmpty()).toBeTruthy()
    })

    test("deve botar uma carta qualquer no topo do monte, se ele estiver vazio", () => {
        expect(fakeStack.size()).toBe(0)
        const carta: Carta = {
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        mesa.botarCarta(carta)
        expect(fakeStack.size()).toBe(1)
        expect(fakeStack.peek()).toBe(carta)
    })


})