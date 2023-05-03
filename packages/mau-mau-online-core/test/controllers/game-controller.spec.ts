import { CancelarPartidaAction } from "@/actions/cancelar-partida-action";
import { DescartarPadraoAction } from "@/actions/descartar-padrao-action";
import { IniciarPartidaAction } from "@/actions/iniciar-partida-action";
import { PescarPadraoAction } from "@/actions/pescar-padrao-action";
import { GameController } from "@/controllers/game-controller"
import { Carta } from "@/entities/carta";
import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";

jest.mock('../../src/actions/iniciar-partida-action');
jest.mock('../../src/actions/cancelar-partida-action');
jest.mock('../../src/actions/pescar-padrao-action');
jest.mock('../../src/actions/descartar-padrao-action');
let iniciarPartidaAction = jest.mocked(IniciarPartidaAction);
let cancelarPartidaAction = jest.mocked(CancelarPartidaAction);
let pescarPadraoAction = jest.mocked(PescarPadraoAction);
let descartarPadraoAction = jest.mocked(DescartarPadraoAction);

describe("Game Controller", () => {

    let sut: GameController

    test.todo('criar a sala')
    test.todo('entrar na sala')
    test.todo('sair da sala')

    beforeEach(() => {
        sut = new GameController(null)
    })

    test("deve iniciar uma partida", () => {
        sut.execute('start')
        expect(iniciarPartidaAction.prototype.execute).toHaveBeenCalledTimes(1)
    })

    test("deve cancelar uma partida", () => {
        sut.execute('cancel')
        expect(cancelarPartidaAction.prototype.execute).toHaveBeenCalledTimes(1)
    })
    
    test("jogador 0 deve pescar uma carta", () => {
        sut.execute('pescar-padrao', { jogadorId: '0' })
        expect(pescarPadraoAction.prototype.execute).toHaveBeenCalledWith({ jogadorId: '0' })
    })
    
    test("jogador 0 deve descartar uma carta", () => {
        const carta: Carta = {
            id: "cartaId",
            naipe: Naipe.Espadas,
            numero: NumeroCarta.As
        }
        sut.execute('descartar-padrao', { jogadorId: '0', cartasId: [carta.id] })
        expect(descartarPadraoAction.prototype.execute).toHaveBeenCalledWith({ jogadorId: '0', cartasId: [carta.id] })
    })
})