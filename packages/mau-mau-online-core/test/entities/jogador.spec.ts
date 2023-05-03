import { ArrayList } from "@/entities/array-list"
import { Carta } from "@/entities/carta"
import { Jogador } from "@/entities/jogador"
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";

jest.mock('../../src/entities/array-list');
let mockedList = jest.mocked(ArrayList);

describe("Jogador entity", () => {

    let list: ArrayList<Carta>;
    let sut: Jogador;

    beforeEach(() => {
        jest.clearAllMocks()
        list = new ArrayList<Carta>()
        sut = new Jogador('valid-id', list)
    });

    test("deve iniciar vazio de cartas", () => {
        mockedList.prototype.size.mockReturnValueOnce(0)

       expect(sut.size()).toBe(0)
       expect(sut.getId()).toBe('valid-id')
       expect(sut.isActive()).toBeTruthy()
    })

    test("deve inativa/ativar um jogador", () => {
       expect(sut.isActive()).toBeTruthy()
       sut.setActive(false)
       expect(sut.isActive()).toBeFalsy()
       sut.setActive(true)
       expect(sut.isActive()).toBeTruthy()
    })

    test("deve botar uma carta qualquer no final da lista", () => {
        const carta0: Carta = {
            id: 'id0',
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        sut.botarCarta(carta0)
        expect(mockedList.prototype.add).toBeCalledWith(carta0)
        
        const carta1: Carta = {
            id: 'id1',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        sut.botarCarta(carta1)
        expect(mockedList.prototype.add).toBeCalledWith(carta1)
    })

    test("deve tirar uma carta da lista", () => {
        const carta1: Carta = {
            id: 'id1',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        mockedList.prototype.remove.mockReturnValueOnce(carta1)

        const carta = sut.tirarCarta(carta1)
        expect(mockedList.prototype.remove).toBeCalledWith(carta1)
        expect(carta).toEqual(carta1)
    })

    test('deve verificar se contém uma carta', () => {
        const carta1: Carta = {
            id: 'id1',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        const carta2: Carta = {
            id: 'id2',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        mockedList.prototype.contains.mockReturnValueOnce(true).mockReturnValueOnce(false)

        const result1 = sut.contains(carta1)
        expect(mockedList.prototype.contains).toBeCalledWith(carta1)
        expect(result1).toBeTruthy()

        const result2 = sut.contains(carta2)
        expect(mockedList.prototype.contains).toBeCalledWith(carta2)
        expect(result2).toBeFalsy()
    })

    test('deve retornar uma carta a partir do index', () => {
        const carta: Carta = {
            id: 'id1',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        mockedList.prototype.get.mockReturnValueOnce(carta)

        const result = sut.get(3)
        expect(mockedList.prototype.get).toBeCalledWith(3)
        expect(result).toEqual(carta)
    })

    test('deve retornar o index de uma carta', () => {
        const carta: Carta = {
            id: 'id1',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        mockedList.prototype.indexOf.mockReturnValueOnce(3)

        const result = sut.indexOf(carta)
        expect(mockedList.prototype.indexOf).toBeCalledWith(carta)
        expect(result).toEqual(3)
    })

    test("deve listar todas as cartas que possui na lista", () => {
        const carta0: Carta = {
            id: 'id0',
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }

        const carta1: Carta = {
            id: 'id1',
            naipe: Naipe.Copas,
            numero: NumeroCarta.Cinco
        }

        const carta2: Carta = {
            id: 'id2',
            naipe: Naipe.Ouros,
            numero: NumeroCarta.Rei
        }
        
        mockedList.prototype.iterator.mockImplementation(function* () {
            yield carta0
            yield carta1
            yield carta2
        })

        const cartas = [...sut.iterator()]
        expect(cartas).toHaveLength(3)
        expect(cartas[0]).toEqual(carta0)
        expect(cartas[1]).toEqual(carta1)
        expect(cartas[2]).toEqual(carta2)
    })

    // test.skip("deve tirar uma carta de uma posição da lista", () => {
    //     const carta0: Carta = {
    //         id: 'id0',
    //         naipe: Naipe.Espadas,
    //         numero: NumeroCarta.As
    //     }

    //     const carta1: Carta = {
    //         id: 'id1',
    //         naipe: Naipe.Copas,
    //         numero: NumeroCarta.Cinco
    //     }

    //     const carta2: Carta = {
    //         id: 'id2',
    //         naipe: Naipe.Ouros,
    //         numero: NumeroCarta.Rei
    //     }

    //     jogador.botarCarta(carta0)
    //     jogador.botarCarta(carta1)
    //     jogador.botarCarta(carta2)

    //     const cartaRetirada = jogador.tirarCartaAtIndex(1)
    //     expect(cartaRetirada).toEqual(carta1)
    //     expect(jogador.size()).toEqual(2)
    //     expect(jogador.contains(carta1)).toBeFalsy()

    // })
})