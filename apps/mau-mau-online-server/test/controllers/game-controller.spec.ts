import { GameController } from "@/controllers/game-controller"
import { Partida } from "@/entities/partida"
import { StatusPartida } from "@/entities/status-partida"

jest.mock('../../src/entities/partida');
let mockedPartida = jest.mocked(Partida);

let mockedStatus: jest.Mock<StatusPartida>
let mockedCurrentJogador: jest.Mock<number>

describe("Game Controller", () => {

    let partida: Partida
    let sut: GameController

    test.todo('criar a sala')
    test.todo('entrar na sala')
    test.todo('sair da sala')

    beforeEach(() => {
        partida = new Partida(null)
        sut = new GameController(partida)
    })

    test("deve iniciar uma partida", () => {
        sut.startPartida()
        expect(mockedPartida.prototype.start).toHaveBeenCalledTimes(1)
    })

    test("deve cancelar uma partida", () => {
        sut.cancelPartida()

        expect(mockedPartida.prototype.cancel).toHaveBeenCalledTimes(1)
    })
})