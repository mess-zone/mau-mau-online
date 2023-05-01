import { Action } from "@/actions/ports/action";
import { Partida } from "@/entities/partida";
import { StatusPartida } from "@/entities/status-partida";

export type IniciarPartidaConfig = {

}

export class IniciarPartidaAction implements Action {
    private readonly context: Partida

    constructor(context: Partida) {
        this.context = context
    }

    public execute(options: IniciarPartidaConfig) {
        if(this.context.status != StatusPartida.PENDENTE) {
            throw new Error("A partida não está pendente");
        }

        if(this.context.getJogadores().length < 2) {
            throw new Error("Para iniciar uma partida é preciso ter pelo menos dois jogadores");
        }

        this.context.start()
    }

}