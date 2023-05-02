import { GameController } from "@/controllers/game-controller"
import { Partida } from "@/entities/partida"
import { StatusPartida } from "@/entities/status-partida"

jest.mock('../../src/entities/partida');
let mockedPartida = jest.mocked(Partida);

let mockedStatus: jest.Mock<StatusPartida>
let mockedCurrentJogador: jest.Mock<number>

describe("Game Controller", () => {

    let partida: Partida

    test.todo('criar a sala')
    test.todo('entrar na sala')
    test.todo('sair da sala')

    test("deve iniciar uma partida com 2 jogadores", () => {
        partida = new Partida(null)
        const sut = new GameController(partida)

        sut.startPartida()

        expect(mockedPartida.prototype.start).toHaveBeenCalledTimes(1)
    })
})