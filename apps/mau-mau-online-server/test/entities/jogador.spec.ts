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
})