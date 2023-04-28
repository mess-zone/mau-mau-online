import { Baralho } from "@/entities/baralho"
import { Carta } from "@/entities/carta"
import { Naipe } from "@/entities/naipe"
import { ValorCarta, ValorCartaStrings } from "@/entities/valor-carta"


describe("Baralho entity", () => {
    let baralho: Baralho

    let cartasEspadas: Carta[]
    let cartasOuros: Carta[]
    let cartasCopas: Carta[]
    let cartasPaus: Carta[]

    beforeAll(() => {
        baralho = new Baralho()

        cartasEspadas = baralho.cartas.filter(carta => carta.naipe == Naipe.Espadas)
        cartasOuros = baralho.cartas.filter(carta => carta.naipe == Naipe.Ouros)
        cartasCopas = baralho.cartas.filter(carta => carta.naipe == Naipe.Copas)
        cartasPaus = baralho.cartas.filter(carta => carta.naipe == Naipe.Paus)
    })

    test('deve ter 52 cartas', () => {
        expect(baralho.cartas).toHaveLength(52)
    })

    test('deve ter 13 cartas de cada naipe', () => {
        expect(cartasEspadas).toHaveLength(13)
        expect(cartasOuros).toHaveLength(13)
        expect(cartasCopas).toHaveLength(13)
        expect(cartasPaus).toHaveLength(13)
    })

    test('cada naipe deve ter 13 valores de cartas', () => {
        for(const valor in ValorCarta) {
            expect(cartasEspadas.filter(carta => carta.valor === ValorCarta[valor as ValorCartaStrings])).toHaveLength(1)
        }

        for(const valor in ValorCarta) {
            expect(cartasOuros.filter(carta => carta.valor === ValorCarta[valor as ValorCartaStrings])).toHaveLength(1)
        }

        for(const valor in ValorCarta) {
            expect(cartasCopas.filter(carta => carta.valor === ValorCarta[valor as ValorCartaStrings])).toHaveLength(1)
        }

        for(const valor in ValorCarta) {
            expect(cartasPaus.filter(carta => carta.valor === ValorCarta[valor as ValorCartaStrings])).toHaveLength(1)
        }
    })
})