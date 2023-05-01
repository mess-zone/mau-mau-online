import { CancelarPartidaAction } from "@/actions/cancelar-partida-action"
import { Partida } from "@/entities/partida"

jest.mock('../../src/entities/partida');
let mockedPartida = jest.mocked(Partida);

describe("Cancelar Partida (Action)", () => {
    let partida: Partida
    let sut: CancelarPartidaAction

    beforeEach(() => {
        jest.clearAllMocks()

        partida = new Partida(null)
        sut = new CancelarPartidaAction(partida)
    })

    test('deve cancelar a partida', () => {
        sut.execute({})
        expect(mockedPartida.prototype.cancel).toHaveBeenCalledTimes(1)
    })

})