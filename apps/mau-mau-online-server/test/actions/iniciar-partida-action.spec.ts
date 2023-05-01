import { IniciarPartidaAction } from "@/actions/iniciar-partida-action";
import { Jogador } from "@/entities/jogador";
import { Partida } from "@/entities/partida"

jest.mock('../../src/entities/partida');
jest.mock('../../src/entities/jogador');
let mockedPartida = jest.mocked(Partida);
// let mockedJogador = jest.mocked(Jogador);

mockedPartida.prototype.getJogadores.mockReturnValue([ new Jogador(null) ])

describe("Iniciar Partida (Action)", () => {
    let partida: Partida
    let sut: IniciarPartidaAction

    beforeEach(() => {
        jest.clearAllMocks()

        partida = new Partida(null)
        sut = new IniciarPartidaAction(partida)
    })

    test.todo('não deve iniciar partida se não estiver pendente')
    test.todo('deve iniciar partida se estiver pendente')

    test('não deve iniciar partida se não houver ao menos 2 jogadores', () => {
        mockedPartida.prototype.getJogadores.mockReturnValueOnce([new Jogador(null)])
        expect(() => {  sut.execute({}) }).toThrowError('Para iniciar uma partida é preciso ter pelo menos dois jogadores')
    })

    test('deve iniciar partida se houver ao menos 2 jogadores', () => {
        mockedPartida.prototype.getJogadores.mockReturnValueOnce([new Jogador(null), new Jogador(null)])

        sut.execute({})

        expect(mockedPartida.prototype.start).toHaveBeenCalledTimes(1)

    })
})