import { CancelarPartidaAction } from "../actions/cancelar-partida-action"
import { DescartarPadraoAction } from "../actions/descartar-padrao-action"
import { IniciarPartidaAction } from "../actions/iniciar-partida-action"
import { PescarPadraoAction } from "../actions/pescar-padrao-action"
import { Partida } from "../entities/partida"

export type CommandOptions = {
    jogadorId?: string,
    cartasId?: string[],
}

export class GameController {
    public readonly partida: Partida
    public commandMap: Map<string, (partida: Partida, options?: CommandOptions) => void>

    constructor(partida: Partida) {
        this.partida = partida

        this.commandMap = new Map<string, (partida: Partida, options?: CommandOptions) => void>()
        this.commandMap.set(
            'start', 
            (partida: Partida) => {
                const action = new IniciarPartidaAction(partida)
                action.execute({})
            }
        )
        this.commandMap.set(
            'cancel', 
            (partida: Partida) => {
                const action = new CancelarPartidaAction(partida)
                action.execute({})
            }
        )
        this.commandMap.set(
            'pescar-padrao',
            (partida: Partida, options: CommandOptions) => {
                const action = new PescarPadraoAction(partida)
                action.execute({ jogadorId: options.jogadorId })
            }
        )
        this.commandMap.set(
            'descartar-padrao',
            (partida: Partida, options: CommandOptions) => {
                const action = new DescartarPadraoAction(partida)
                action.execute({ jogadorId: options.jogadorId, cartasId: options.cartasId })
            }
        )
    }

    public execute(commandName: string, options?: CommandOptions) {
        const executeCommand = this.commandMap.get(commandName)
        if(executeCommand) {
            executeCommand(this.partida, options)
        }
    }
}