import { Baralho } from "@/entities/baralho"
import { Carta } from "@/entities/carta"
import { Naipe } from "@/entities/naipe"
import { NumeroCarta, NumeroCartaStrings } from "@/entities/numero-carta"


describe("Baralho entity", () => {
    describe('constructor', () => {
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
    
        test('cada naipe deve ter cartas de 13 numeros', () => {
            for(const valor in NumeroCarta) {
                expect(cartasEspadas.filter(carta => carta.numero === NumeroCarta[valor as NumeroCartaStrings])).toHaveLength(1)
            }
    
            for(const valor in NumeroCarta) {
                expect(cartasOuros.filter(carta => carta.numero === NumeroCarta[valor as NumeroCartaStrings])).toHaveLength(1)
            }
    
            for(const valor in NumeroCarta) {
                expect(cartasCopas.filter(carta => carta.numero === NumeroCarta[valor as NumeroCartaStrings])).toHaveLength(1)
            }
    
            for(const valor in NumeroCarta) {
                expect(cartasPaus.filter(carta => carta.numero === NumeroCarta[valor as NumeroCartaStrings])).toHaveLength(1)
            }
        })
    })

    describe('embaralhar', () => {
        let baralho: Baralho

        let cartasEspadas: Carta[]
        let cartasOuros: Carta[]
        let cartasCopas: Carta[]
        let cartasPaus: Carta[]

        let baralhoCopy: Carta[]

        beforeAll(() => {
            baralho = new Baralho()

            baralhoCopy = JSON.parse(JSON.stringify(baralho.cartas));

            baralho.embaralhar()

            cartasEspadas = baralho.cartas.filter(carta => carta.naipe == Naipe.Espadas)
            cartasOuros = baralho.cartas.filter(carta => carta.naipe == Naipe.Ouros)
            cartasCopas = baralho.cartas.filter(carta => carta.naipe == Naipe.Copas)
            cartasPaus = baralho.cartas.filter(carta => carta.naipe == Naipe.Paus)
        })

        test('deve embaralhar a ordem das cartas', () => {
            expect(baralho.cartas).not.toEqual(baralhoCopy)
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

        test('cada naipe deve ter cartas de 13 numeros', () => {
            for(const valor in NumeroCarta) {
                expect(cartasEspadas.filter(carta => carta.numero === NumeroCarta[valor as NumeroCartaStrings])).toHaveLength(1)
            }

            for(const valor in NumeroCarta) {
                expect(cartasOuros.filter(carta => carta.numero === NumeroCarta[valor as NumeroCartaStrings])).toHaveLength(1)
            }

            for(const valor in NumeroCarta) {
                expect(cartasCopas.filter(carta => carta.numero === NumeroCarta[valor as NumeroCartaStrings])).toHaveLength(1)
            }

            for(const valor in NumeroCarta) {
                expect(cartasPaus.filter(carta => carta.numero === NumeroCarta[valor as NumeroCartaStrings])).toHaveLength(1)
            }
        })
    })
})