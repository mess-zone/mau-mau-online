import { Partida } from "@/entities/partida"

export class GameController {
    public readonly partida: Partida

    constructor(partida: Partida) {
        this.partida = partida
    }

    public startPartida() {
        this.partida.start()
    }
}