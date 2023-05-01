import { Partida } from "@/entities/partida"
import { Action } from "@/actions/ports/action"

export type CancelarPartidaConfig = {

}

export class CancelarPartidaAction implements Action {
    private readonly context: Partida

    constructor(context: Partida) {
        this.context = context
    }

    public execute(options: CancelarPartidaConfig) {
        this.context.cancel()
    }
}