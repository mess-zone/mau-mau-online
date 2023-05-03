import { ArrayList } from "@mess-zone/mau-mau-online-core"
import { User } from "./user"

export type RoomConfig = {
    id: string,
    list: ArrayList<User>
}

/**
 * Representa uma sala virtual
 */
export class Room {
    private readonly id: string
    private readonly users: ArrayList<User>

    constructor({id}: RoomConfig) {
        this.id = id
        this.users = new ArrayList<User>()
    }

    public getId() {
        return this.id
    }

    public addUser(user: User) {
        this.users.add(user)
    }

    public removeUser(id: string) {
        const user = this.getById(id)
        return this.users.remove(user)   
    }

    public getById(id: string) {
        for(const user of this.iterator()) {
            if(user.id === id) {
                return user
            }
        }

        return undefined
    }

    public size() {
        return this.users.size()
    }

    public *iterator() {
        yield* this.users.iterator()
    }
}