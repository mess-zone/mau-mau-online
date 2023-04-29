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
       expect(mesa.size()).toBe(0)
    })

    test('deve retornar quantas cartas existem no monte', () => {
        const stackSize = fakeStack.size()
        expect(mesa.size()).toBe(stackSize)
    })

    test('deve visualizar a carta no topo do monte', () => {
        expect(mesa.peek()).toBeUndefined()

        const carta: Carta = {
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        mesa.botarCarta(carta)
        expect(mesa.peek()).toBe(carta)
    })

    test("deve botar uma carta qualquer no topo do monte", () => {
        expect(mesa.size()).toBe(0)
        const carta: Carta = {
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        mesa.botarCarta(carta)
        expect(mesa.size()).toBe(1)
        expect(fakeStack.peek()).toBe(carta)
    })

    describe('validação de movimentos', () => {
        test("deve aceitar botar qualquer carta no topo do monte vazio", () => {
            const carta: Carta = {
                naipe: Naipe.Espadas,
                numero: NumeroCarta.As
            }

            expect(mesa.validateMove(carta)).toBeTruthy()
        })
    
        test("deve permitir botar uma carta com o mesmo naipe da carta no topo do monte", () => {
            const carta1: Carta = {
                naipe: Naipe.Espadas,
                numero: NumeroCarta.As
            }
            mesa.botarCarta(carta1)

            const carta2: Carta = {
                naipe: Naipe.Espadas,
                numero: NumeroCarta.Tres
            }

            expect(mesa.validateMove(carta2)).toBeTruthy()
        })
   
        test("deve permitir botar uma carta com o mesmo numero da carta no topo do monte", () => {
            const carta1: Carta = {
                naipe: Naipe.Espadas,
                numero: NumeroCarta.As
            }
            mesa.botarCarta(carta1)

            const carta2: Carta = {
                naipe: Naipe.Ouros,
                numero: NumeroCarta.As
            }

            expect(mesa.validateMove(carta2)).toBeTruthy()
        })
 
        test("não deve permitir botar uma carta com numero e naipe diferente da carta no topo do monte", () => {
            const carta1: Carta = {
                naipe: Naipe.Espadas,
                numero: NumeroCarta.As
            }
            mesa.botarCarta(carta1)

            const carta2: Carta = {
                naipe: Naipe.Ouros,
                numero: NumeroCarta.Tres
            }

            expect(mesa.validateMove(carta2)).toBeFalsy()
        })
    })




})