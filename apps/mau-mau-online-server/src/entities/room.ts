export type RoomConfig = {
    id: string
}

/**
 * Representa uma sala virtual
 */
export class Room {
    private readonly id: string

    constructor({id}: RoomConfig) {
        this.id = id
    }

    public getId() {
        return this.id
    }
}