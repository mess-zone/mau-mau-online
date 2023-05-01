import { Baralho } from "@/entities/baralho";
import { Carta } from "@/entities/carta";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta, NumeroCartaStrings } from "@/entities/numero-carta";
import { Stack } from "@/entities/stack";

jest.mock('../../src/entities/stack');
let mockedStack = jest.mocked(Stack);

describe("Baralho entity", () => {
    let stack: Stack<Carta>;
    let sut: Baralho;

    beforeEach(() => {
        jest.clearAllMocks()
        stack = new Stack<Carta>();
        sut = new Baralho(stack);
    });

    test("deve criar cartas e embaralhar o baralho", () => {
        // deve ter 52 cartas
        expect(mockedStack.prototype.push).toBeCalledTimes(52)

        let cartasEspadas = mockedStack.prototype.push.mock.calls.filter(([carta]) => carta.naipe == Naipe.Espadas).map(array => array[0]);
        let cartasOuros = mockedStack.prototype.push.mock.calls.filter(([carta]) => carta.naipe == Naipe.Ouros).map(array => array[0]);
        let cartasCopas = mockedStack.prototype.push.mock.calls.filter(([carta]) => carta.naipe == Naipe.Copas).map(array => array[0]);
        let cartasPaus = mockedStack.prototype.push.mock.calls.filter(([carta]) => carta.naipe == Naipe.Paus).map(array => array[0]);
        
        // // deve ter 13 cartas de cada naipe
        expect(cartasEspadas).toHaveLength(13);
        expect(cartasOuros).toHaveLength(13);
        expect(cartasCopas).toHaveLength(13);
        expect(cartasPaus).toHaveLength(13);

        // // cada naipe deve ter 1 carta de cada numero
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

    test("deve retirar uma carta do topo do monte", () => {
        const cartaTopo: Carta = {
            id: "topo",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        mockedStack.prototype.pop.mockReturnValueOnce(cartaTopo)
        
        const carta = sut.tirarCarta()
        expect(carta).toEqual(cartaTopo)
    })

    test('se não tiver cartas, retornar undefined', () => {
        mockedStack.prototype.pop.mockReturnValueOnce(undefined)

        const carta = sut.tirarCarta()

        expect(carta).toBeUndefined()
    })

    test('deve retornar quantas cartas existem no monte', () => {
        mockedStack.prototype.size.mockReturnValueOnce(10)
        
        expect(sut.size()).toBe(10)
    })
});
