import { Baralho } from "@/entities/baralho";
import { Carta } from "@/entities/carta";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta, NumeroCartaStrings } from "@/entities/numero-carta";
import { FakeStack } from "@test/doubles/fake-stack";
import { validate as uuidValidate } from 'uuid';

describe("Baralho entity", () => {
    let fakeStack: FakeStack<Carta>;
    let baralho: Baralho;

    beforeEach(() => {
        fakeStack = new FakeStack<Carta>();
        baralho = new Baralho(fakeStack);
    });

    test("deve criar cartas e embaralhar o baralho", () => {
        // deve ter 52 cartas
        expect(fakeStack.size()).toBe(52);

        let cartasEspadas = fakeStack._getItemsArray().filter((carta) => carta.naipe == Naipe.Espadas);
        let cartasOuros = fakeStack._getItemsArray().filter((carta) => carta.naipe == Naipe.Ouros);
        let cartasCopas = fakeStack._getItemsArray().filter((carta) => carta.naipe == Naipe.Copas);
        let cartasPaus = fakeStack._getItemsArray().filter((carta) => carta.naipe == Naipe.Paus);

        // deve ter 13 cartas de cada naipe
        expect(cartasEspadas).toHaveLength(13);
        expect(cartasOuros).toHaveLength(13);
        expect(cartasCopas).toHaveLength(13);
        expect(cartasPaus).toHaveLength(13);

        // cada naipe deve ter 1 carta de cada numero
        for (const numero in NumeroCarta) {
            expect(
                cartasEspadas.filter(
                    (carta) =>
                        carta.numero ===
                        NumeroCarta[numero as NumeroCartaStrings]
                )
            ).toHaveLength(1);
        }

        for (const numero in NumeroCarta) {
            expect(
                cartasOuros.filter(
                    (carta) =>
                        carta.numero ===
                        NumeroCarta[numero as NumeroCartaStrings]
                )
            ).toHaveLength(1);
        }

        for (const numero in NumeroCarta) {
            expect(
                cartasCopas.filter(
                    (carta) =>
                        carta.numero ===
                        NumeroCarta[numero as NumeroCartaStrings]
                )
            ).toHaveLength(1);
        }

        for (const numero in NumeroCarta) {
            expect(
                cartasPaus.filter(
                    (carta) =>
                        carta.numero ===
                        NumeroCarta[numero as NumeroCartaStrings]
                )
            ).toHaveLength(1);
        }
    });

    test("uma carta deve ter um id único, numero e naipe", () => {
        const carta = baralho.tirarCarta()

        expect(uuidValidate(carta.id)).toBeTruthy()
        expect(carta.naipe).toBeDefined()
        expect(carta.numero).toBeDefined()
    })
    test("uma carta não deve ter suas propriedades alteradas", () => {
        const naipe = fakeStack.peek().naipe
        const numero = fakeStack.peek().numero

        const carta = baralho.tirarCarta()
        expect(carta.naipe).toEqual(naipe)
        expect(carta.numero).toEqual(numero)
        
        
        expect(() => { carta.naipe = Naipe.Copas }).toThrow()
        expect(() => { carta.numero = NumeroCarta.Dois }).toThrow()

        expect(carta.naipe).toEqual(naipe)
        expect(carta.numero).toEqual(numero)
    })

    test("deve retirar uma carta do topo do monte", () => {
        const peek = fakeStack.peek()
        expect(fakeStack.size()).toBe(52)
        const carta = baralho.tirarCarta()
        expect(fakeStack.size()).toBe(51)
        expect(carta).toEqual(peek)
    })

    test('se não tiver cartas, retornar undefined', () => {
        let carta = null
        for(let i = 0; i <= 52; i++) {
            carta = baralho.tirarCarta()
        }

        expect(carta).toBeUndefined()
    })

    test('deve retornar quantas cartas existem no monte', () => {
        const stackSize = fakeStack.size()
        expect(baralho.size()).toBe(stackSize)
    })
});
