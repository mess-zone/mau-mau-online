import { ArrayList } from "@/entities/array-list"
import { Carta } from "@/entities/carta"
import { Jogador } from "@/entities/jogador"
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";

describe("Jogador entity", () => {

    let list: ArrayList<Carta>;
    let jogador: Jogador;

    beforeEach(() => {
        list = new ArrayList<Carta>()
        jogador = new Jogador(list)
    });

    test("deve iniciar vazio de cartas", () => {
       expect(jogador.size()).toBe(0)
    })

    test("deve botar uma carta qualquer no final da lista", () => {
        expect(jogador.size()).toBe(0)
        
        const carta0: Carta = {
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        jogador.botarCarta(carta0)
        expect(jogador.size()).toBe(1)
        expect(jogador.contains(carta0)).toBeTruthy()
        expect(jogador.get(0)).toEqual(carta0)
        expect(jogador.indexOf(carta0)).toEqual(0)
        
        const carta1: Carta = {
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        jogador.botarCarta(carta1)
        expect(jogador.size()).toBe(2)
        expect(jogador.contains(carta1)).toBeTruthy()
        expect(jogador.get(1)).toEqual(carta1)
        expect(jogador.indexOf(carta1)).toEqual(1)
    })

    test("deve tirar uma carta da lista", () => {
        const carta0: Carta = {
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        const carta1: Carta = {
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        const carta2: Carta = {
            naipe: Naipe.Ouros,
            numero: NumeroCarta.Rei
        }

        jogador.botarCarta(carta0)
        jogador.botarCarta(carta1)
        jogador.botarCarta(carta2)

        expect(jogador.tirarCarta(carta1)).toBeTruthy()
        expect(jogador.size()).toEqual(2)
        expect(jogador.contains(carta1)).toBeFalsy()

    })

    test("deve tirar uma carta de uma posição da lista", () => {
        const carta0: Carta = {
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        const carta1: Carta = {
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        const carta2: Carta = {
            naipe: Naipe.Ouros,
            numero: NumeroCarta.Rei
        }

        jogador.botarCarta(carta0)
        jogador.botarCarta(carta1)
        jogador.botarCarta(carta2)

        const cartaRetirada = jogador.tirarCartaAtIndex(1)
        expect(cartaRetirada).toEqual(carta1)
        expect(jogador.size()).toEqual(2)
        expect(jogador.contains(carta1)).toBeFalsy()

    })

    test("deve litar todas as cartas que possui na lista", () => {
        const carta0: Carta = {
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        const carta1: Carta = {
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        const carta2: Carta = {
            naipe: Naipe.Ouros,
            numero: NumeroCarta.Rei
        }

        jogador.botarCarta(carta0)
        jogador.botarCarta(carta1)
        jogador.botarCarta(carta2)

        const cartas = [...jogador.iterator()]
        expect(cartas).toHaveLength(3)
        expect(cartas[0]).toEqual(carta0)
        expect(cartas[1]).toEqual(carta1)
        expect(cartas[2]).toEqual(carta2)
    })
})