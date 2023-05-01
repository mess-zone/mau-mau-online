import { ArrayList } from "@/entities/array-list";
import { Baralho } from "@/entities/baralho";
import { Carta } from "@/entities/carta";
import { Jogador } from "@/entities/jogador";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";
import { Partida } from "@/entities/partida"
import { PilhaDeDescarte } from "@/entities/pilha-de-descarte";
import { Stack } from "@/entities/stack";
import { StatusPartida } from "@/entities/status-partida";
import { FakeStack } from "@test/doubles/fake-stack";

jest.mock('../doubles/fake-stack');

let mockedFakeStack = jest.mocked(FakeStack);

describe("Partida entity", () => {
    let partida: Partida

    let stackBaralho: Stack<Carta>
    let baralho: Baralho

    let stackDescarte: Stack<Carta>
    let pilhaDeDescarte: PilhaDeDescarte

    let cartasJogador1: ArrayList<Carta>
    let jogador1: Jogador

    let cartasJogador2: ArrayList<Carta>
    let jogador2: Jogador

    let cartasJogador3: ArrayList<Carta>
    let jogador3: Jogador

    beforeEach(() => {
        mockedFakeStack.mockClear()
        stackBaralho = new Stack<Carta>()
        baralho = new Baralho(stackBaralho)

        stackDescarte = new Stack<Carta>()
        pilhaDeDescarte = new PilhaDeDescarte(stackDescarte)

        cartasJogador1 = new ArrayList<Carta>()
        jogador1 = new Jogador(cartasJogador1)

        cartasJogador2 = new ArrayList<Carta>()
        jogador2 = new Jogador(cartasJogador2)

        cartasJogador3 = new ArrayList<Carta>()
        jogador3 = new Jogador(cartasJogador3)

        partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2, jogador3 ] })
    });

    test('deve iniciar partida se houver ao menos 2 jogadores', () => {
        expect(partida.status).toBe(StatusPartida.PENDENTE)
        
        expect(partida.getJogadores()[0].size()).toBe(0)
        expect(partida.getJogadores()[1].size()).toBe(0)
        expect(partida.getJogadores()[2].size()).toBe(0)

        expect(partida.currentJogador).toBe(-1)
        
        const started = partida.start()

        // atualiza o status para EM ANDAMENTO
        expect(started).toBeTruthy()
        expect(partida.status).toBe(StatusPartida.EM_ANDAMENTO)
        expect(partida.currentJogador).toBe(0)

        // distribui as cartas do baralho
        expect(partida.getJogadores()[0].size()).toBe(7)
        expect(partida.getJogadores()[1].size()).toBe(7)
        expect(partida.getJogadores()[2].size()).toBe(7)
        expect(partida.getBaralho().size()).toBe(52 - (7 * 3))


    })

    test('não deve iniciar partida se não houver ao menos 2 jogadores', () => {
        const stackBaralho = new Stack<Carta>()
        const baralho = new Baralho(stackBaralho)

        const stackDescarte = new Stack<Carta>()
        const pilhaDeDescarte = new PilhaDeDescarte(stackDescarte)

        const cartasJogador1 = new ArrayList<Carta>()
        const jogador1 = new Jogador(cartasJogador1)
        partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1 ] })

        expect(partida.status).toBe(StatusPartida.PENDENTE)
        const started = partida.start()
        expect(started).toBeFalsy()
        expect(partida.status).toBe(StatusPartida.PENDENTE)

        expect(partida.getBaralho().size()).toBe(52)

    })

    test('deve cancelar partida', () => {
        partida.start()
        expect(partida.status).toBe(StatusPartida.EM_ANDAMENTO)

        partida.cancel()
        expect(partida.status).toBe(StatusPartida.CANCELADA)
        
        
    })

    test('deve passar a vez para o próximo jogador', () => {
        partida.start()
        expect(partida.currentJogador).toBe(0)
        partida.nextPlayer()
        expect(partida.currentJogador).toBe(1)
        partida.nextPlayer()
        expect(partida.currentJogador).toBe(2)
        partida.nextPlayer()
        expect(partida.currentJogador).toBe(0)
    })
    
    describe('move', () => {
        test('um jogador não pode jogar se a partida não estiver em andamento', () => {
            // partida.start()
    
            expect(() => {  partida.move({ jogadorIndex: 1, moveType: 'PESCAR'}) }).toThrowError('A partida não está em andamento')
           
        })
    
        test('um jogador pode descartar uma carta se for a sua vez', () => {
            partida.start()

            const jogadorIndex = 0
            const cartaIndex = 3
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            const carta = partida.getJogadores()[jogadorIndex].get(cartaIndex)
            expect(partida._pilhaDeDescarte.size()).toBe(0)

            const [ cartaDescartada ] = partida.move({ jogadorIndex, moveType: 'DESCARTAR', cartas: [carta] })

            expect(cartaDescartada).toEqual(carta)
            expect(partida.getJogadores()[jogadorIndex].contains(cartaDescartada)).toBeFalsy()
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(6)
            expect(partida._pilhaDeDescarte.size()).toBe(1)
            expect(partida._pilhaDeDescarte.peek()).toBe(cartaDescartada)
        })
    
        test('um jogador pode descartar mais de uma carta se for a sua vez', () => {
            mockedFakeStack.prototype.pop
                .mockReturnValueOnce({ id: 'c0', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c1', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c2', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c3', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c4', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c5', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c6', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })

                .mockReturnValueOnce({ id: 'c7', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c8', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c9', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c10', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c11', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c12', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c13', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })


            const fakeStackBaralho = new FakeStack<Carta>()
            const baralho = new Baralho(fakeStackBaralho)

            partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2 ] })

            partida.start()

            const jogadorIndex = 0
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            const cartaA = partida.getJogadores()[jogadorIndex].get(0)
            const cartaB = partida.getJogadores()[jogadorIndex].get(3)
            expect(partida._pilhaDeDescarte.size()).toBe(0)

            const cartasDescartadas = partida.move({ jogadorIndex, moveType: 'DESCARTAR', cartas: [cartaA, cartaB] })

            expect(cartasDescartadas).toEqual([cartaA, cartaB])
            expect(partida.getJogadores()[jogadorIndex].contains(cartaA)).toBeFalsy()
            expect(partida.getJogadores()[jogadorIndex].contains(cartaB)).toBeFalsy()
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(5)
            expect(partida._pilhaDeDescarte.size()).toBe(2)
            expect(partida._pilhaDeDescarte.peek()).toBe(cartaB)
        })

        test('um jogador não pode descartar cartas, se não for a sua vez', () => {
            partida.start()
    
            const jogadorIndex = 1
            const cartaIndex = 3
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            expect(partida._pilhaDeDescarte.size()).toBe(0)
            const carta = partida.getJogadores()[jogadorIndex].get(cartaIndex)

    
            expect(() => { partida.move({ jogadorIndex, moveType: 'DESCARTAR', cartas: [carta] }) }).toThrow('Não é a vez do jogador!')
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            expect(partida._pilhaDeDescarte.size()).toBe(0)
        })

        test.skip('um jogador não pode descartar cartas que não possui', () => {
            partida.start()
    
            const jogadorIndex = 0
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            expect(partida._pilhaDeDescarte.size()).toBe(0)

            const invalidCarta = {
                id: 'invalid',
                naipe: Naipe.Copas,
                numero: NumeroCarta.Cinco
            }
    
            expect(() => { partida.move({ jogadorIndex, moveType: 'DESCARTAR', cartas: [invalidCarta] }) }).toThrow('Index out of bounds')
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            expect(partida._pilhaDeDescarte.size()).toBe(0)
        })

        
        test('um jogador pode pescar uma carta do baralho, se for a sua vez', () => {
            partida.start()
            expect(partida.getBaralho().size()).toBe(31)
    
            const jogadorIndex = 0
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            
            const [carta] = partida.move({ jogadorIndex, moveType: "PESCAR" })
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(8)
            expect(partida.getJogadores()[jogadorIndex].get(7)).toEqual(carta)
            expect(partida.getBaralho().size()).toBe(30)
        })

        test('um jogador pode pescar mais de uma carta do baralho, se for a sua vez', () => {
            partida.start()
            expect(partida.getBaralho().size()).toBe(31)
    
            const jogadorIndex = 0
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            
            const cartas = partida.move({ jogadorIndex, moveType: "PESCAR", qtd: 3 })
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(10)
            expect(partida.getJogadores()[jogadorIndex].get(7)).toEqual(cartas[0])
            expect(partida.getJogadores()[jogadorIndex].get(8)).toEqual(cartas[1])
            expect(partida.getJogadores()[jogadorIndex].get(9)).toEqual(cartas[2])
            expect(partida.getBaralho().size()).toBe(28)
        })

        // TODO E se o jogadorIndex não existir?
        test('um jogador não pode pescar cartas do baralho, se não for a sua vez', () => {
            partida.start()

            const jogadorIndex = 1
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
            
            expect(() => { partida.move({jogadorIndex, moveType: "PESCAR" }) }).toThrow('Não é a vez do jogador!')
            expect(partida.getJogadores()[jogadorIndex].size()).toBe(7)
        })

        test('um jogador não pode pescar cartas do baralho, se não houver cartas suficientes no baralho', () => {
            mockedFakeStack.prototype.pop.mockImplementation(() => {
                return ({
                    naipe: Naipe.Copas,
                    numero: NumeroCarta.Dez
                })
            });

            mockedFakeStack.prototype.size.mockReturnValueOnce(0);

            const fakeStackBaralho = new FakeStack<Carta>()
            const baralho = new Baralho(fakeStackBaralho)
    
            partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2, jogador3 ] })
    
            partida.start()
    
            const jogadorIndex = 0
            expect(() => { partida.move({jogadorIndex, moveType: "PESCAR", qtd: 2 }) }).toThrow('Não há cartas suficientes disponíveis no baralho!')
        })

        test('um jogador pode pescar quantas cartas quiser, mas quando ele descarta uma carta, a vez de jogar passa para o próximo jogador', () => {
            mockedFakeStack.prototype.pop.mockImplementation(() => {
                return ({
                    id: 'c0',
                    naipe: Naipe.Copas,
                    numero: NumeroCarta.Dez
                })
            });
    
            const fakeStackBaralho = new FakeStack<Carta>()
            const baralho = new Baralho(fakeStackBaralho)
    
            partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2, jogador3 ] })
    
            partida.start()

            partida.move({ jogadorIndex: 0, moveType: "PESCAR" })
            expect(partida.currentJogador).toBe(0)
            partida.move({ jogadorIndex: 0, moveType: "PESCAR" })
            expect(partida.currentJogador).toBe(0)
            expect(() => { partida.move({ jogadorIndex: 1, moveType: "PESCAR" }) }).toThrow("Não é a vez do jogador!")
            
            // TODO é muito estranho ter que passar o index do jogador e a carta, porque ainda falta verificar se a carta pertence ao jogador, seria melhor passar o id da carta
            partida.move({ jogadorIndex: 0, moveType: "DESCARTAR", cartas: [partida.getJogadores()[0].get(1)] })
            expect(partida.currentJogador).toBe(1)
            expect(() => { partida.move({ jogadorIndex: 0, moveType: "DESCARTAR", cartas: [partida.getJogadores()[0].get(1)] }) }).toThrow("Não é a vez do jogador!")
            
            partida.move({ jogadorIndex: 1, moveType: "PESCAR" })
            expect(partida.currentJogador).toBe(1)
            partida.move({ jogadorIndex: 1, moveType: "DESCARTAR", cartas: [partida.getJogadores()[1].get(1)] })
            expect(partida.currentJogador).toBe(2)

            partida.move({ jogadorIndex: 2, moveType: "DESCARTAR", cartas: [partida.getJogadores()[2].get(1)] })
            expect(partida.currentJogador).toBe(0)

        })

        test('se o jogador tentar descartar uma carta que não é valida para a mesa (naipe ou numero diferente), ele não passou a vez e deve jogar novamente', () => {
            mockedFakeStack.prototype.pop
                .mockReturnValueOnce({ id: 'c0', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c1', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c2', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c3', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c4', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c5', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })
                .mockReturnValueOnce({ id: 'c6', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro })

                .mockReturnValueOnce({ id: 'c7', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c8', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c9', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c10', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c11', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c12', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })
                .mockReturnValueOnce({ id: 'c13', naipe: Naipe.Paus, numero: NumeroCarta.Cinco })

    
            const fakeStackBaralho = new FakeStack<Carta>()
            const baralho = new Baralho(fakeStackBaralho)
    
            partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [ jogador1, jogador2 ] })
    
            partida.start()


            partida.move({ jogadorIndex: 0, moveType: "DESCARTAR", cartas: [{ id: 'c0', naipe: Naipe.Ouros, numero: NumeroCarta.Quatro }] })
            expect(partida.currentJogador).toBe(1)
            
            expect(() => { partida.move({ jogadorIndex: 1, moveType: "DESCARTAR", cartas:[{ id: 'c7', naipe: Naipe.Paus, numero: NumeroCarta.Cinco }] }) }).toThrow("Movimento não permitido!")
            expect(partida.currentJogador).toBe(1)
        })
    })

    test.todo('should end partida')

})