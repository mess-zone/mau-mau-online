import { Baralho } from "@/entities/baralho"
import { Naipe } from "@/entities/naipe"


describe("Baralho entity", () => {
    test('should have 52 cartas', () => {
        const baralho = new Baralho()
        expect(baralho.cartas).toHaveLength(52)
    })
    test('deve ter 13 cartas de cada naipe', () => {
        const baralho = new Baralho()
        const cartasEspadas = baralho.cartas.filter(carta => carta.naipe == Naipe.Espadas)
        const cartasOuros = baralho.cartas.filter(carta => carta.naipe == Naipe.Ouros)
        const cartasCopas = baralho.cartas.filter(carta => carta.naipe == Naipe.Copas)
        const cartasPaus = baralho.cartas.filter(carta => carta.naipe == Naipe.Paus)

        expect(cartasEspadas).toHaveLength(13)
        expect(cartasOuros).toHaveLength(13)
        expect(cartasCopas).toHaveLength(13)
        expect(cartasPaus).toHaveLength(13)
    })

    test.todo('cada naipe deve ter 13 valores de cartas')
})