import { IniciarPartidaAction } from "@/actions/iniciar-partida-action";
import { Jogador } from "@/entities/jogador";
import { Partida } from "@/entities/partida"
import { StatusPartida } from "@/entities/status-partida";

jest.mock('../../src/entities/partida');
jest.mock('../../src/entities/jogador');
let mockedPartida = jest.mocked(Partida);
let mockedJogador = jest.mocked(Jogador);

mockedPartida.prototype.getJogadores.mockReturnValue([ new Jogador(null), new Jogador(null) ])

let mockedStatus: jest.Mock<StatusPartida>

describe("Iniciar Partida (Action)", () => {
    let partida: Partida
    let sut: IniciarPartidaAction

    beforeEach(() => {
        jest.clearAllMocks()

        mockedStatus = jest.fn(() => null)

        partida = new Partida(null)
        sut = new IniciarPartidaAction(partida)

        Object.defineProperty(partida, 'status', {
            get: mockedStatus,
            set: jest.fn(),
        });

    })

    test('não deve iniciar partida se não estiver pendente', () => {
        mockedStatus.mockReturnValue(StatusPartida.CANCELADA)
        mockedPartida.prototype.getJogadores.mockReturnValue([new Jogador(null), new Jogador(null)])

        expect(() => {  sut.execute({}) }).toThrowError('A partida não está pendente')

    })

    test('deve iniciar partida se estiver pendente', () => {
        mockedStatus.mockReturnValue(StatusPartida.PENDENTE)
        mockedPartida.prototype.getJogadores.mockReturnValue([new Jogador(null), new Jogador(null)])

        sut.execute({})

        expect(mockedPartida.prototype.start).toHaveBeenCalledTimes(1)
    })

    test('não deve iniciar partida se não houver ao menos 2 jogadores', () => {
        mockedStatus.mockReturnValue(StatusPartida.PENDENTE)
        mockedPartida.prototype.getJogadores.mockReturnValue([new Jogador(null)])
        expect(() => {  sut.execute({}) }).toThrowError('Para iniciar uma partida é preciso ter pelo menos dois jogadores')
    })

    test('deve iniciar partida se houver ao menos 2 jogadores', () => {
        mockedStatus.mockReturnValue(StatusPartida.PENDENTE)
        mockedPartida.prototype.getJogadores.mockReturnValue([new Jogador(null), new Jogador(null)])

        sut.execute({})

        expect(mockedPartida.prototype.start).toHaveBeenCalledTimes(1)

    })
})