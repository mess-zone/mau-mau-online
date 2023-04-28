import { Baralho } from "@/entities/baralho";
import { Carta } from "@/entities/carta";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta, NumeroCartaStrings } from "@/entities/numero-carta";

describe("Baralho entity", () => {
    let baralho: Baralho;

    let cartasEspadas: Carta[];
    let cartasOuros: Carta[];
    let cartasCopas: Carta[];
    let cartasPaus: Carta[];

    beforeEach(() => {
        baralho = new Baralho();
    });

    test("deve criar cartas e embaralhar o baralho", () => {
        // deve ter 52 cartas
        expect(baralho.stack.size()).toBe(52);

        const cartas: Carta[] = [];
        while (!baralho.stack.isEmpty()) {
            cartas.push(baralho.stack.pop());
        }

        cartasEspadas = cartas.filter((carta) => carta.naipe == Naipe.Espadas);
        cartasOuros = cartas.filter((carta) => carta.naipe == Naipe.Ouros);
        cartasCopas = cartas.filter((carta) => carta.naipe == Naipe.Copas);
        cartasPaus = cartas.filter((carta) => carta.naipe == Naipe.Paus);

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
});
