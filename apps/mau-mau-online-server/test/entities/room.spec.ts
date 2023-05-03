import { Room, User } from "@/entities"
import { ArrayList } from "@mess-zone/mau-mau-online-core";

jest.mock('@mess-zone/mau-mau-online-core');
let mockedList = jest.mocked(ArrayList);

describe('Room entity', () => {
    let list: ArrayList<User>;

    let room : Room
    beforeEach(() => {
        jest.clearAllMocks()
        list = new ArrayList<User>()
        room = new Room({ id: 'room-id', list })
    })

    test('deve ter um id', () => {
        expect(room.getId()).toBe('room-id')
    })

    test('deve permitir adicionar usuários', () => {
        const user0: User = {
            id: "user0",
            name: "user 0",
            color: "#456456",
            icon: "icon url"
        }
        const user1: User = {
            id: "user1",
            name: "user 1",
            color: "#456456",
            icon: "icon url"
        }

        room.addUser(user0)
        expect(mockedList.prototype.add).toBeCalledWith(user0)
        room.addUser(user1)
        expect(mockedList.prototype.add).toBeCalledWith(user1)
    })

    test('deve permitir remover usuário', () => {
        const user0: User = {
            id: "user0",
            name: "user 0",
            color: "#456456",
            icon: "icon url"
        }
        const user1: User = {
            id: "user1",
            name: "user 1",
            color: "#456456",
            icon: "icon url"
        }
        const user2: User = {
            id: "user2",
            name: "user 2",
            color: "#456456",
            icon: "icon url"
        }

        mockedList.prototype.iterator.mockImplementation(function* () {
            yield user0
            yield user1
            yield user2
        })
        mockedList.prototype.remove.mockReturnValue(user1)

        const removedUser = room.removeUser('user1')
        expect(mockedList.prototype.remove).toBeCalledWith(user1)
        expect(removedUser).toEqual(user1)
    })

    test('deve permitir encontrar um usuario pelo id', () => {
        const user0: User = {
            id: "user0",
            name: "user 0",
            color: "#456456",
            icon: "icon url"
        }
        const user1: User = {
            id: "user1",
            name: "user 1",
            color: "#456456",
            icon: "icon url"
        }
        const user2: User = {
            id: "user2",
            name: "user 2",
            color: "#456456",
            icon: "icon url"
        }

        mockedList.prototype.iterator.mockImplementation(function* () {
            yield user0
            yield user1
            yield user2
        })

        const result = room.getById('user1')
        expect(result).toEqual(user1)
    })

    test('deve retornar undefined se não econtrar um usuario pelo id', () => {
        const result = room.getById('invalid-user-id')
        expect(result).toEqual(undefined)
    })

    test('deve listar todos os usuarios', () => {
        const user0: User = {
            id: "user0",
            name: "user 0",
            color: "#456456",
            icon: "icon url"
        }
        const user1: User = {
            id: "user1",
            name: "user 1",
            color: "#456456",
            icon: "icon url"
        }
        const user2: User = {
            id: "user2",
            name: "user 2",
            color: "#456456",
            icon: "icon url"
        }

        mockedList.prototype.iterator.mockImplementation(function* () {
            yield user0
            yield user1
            yield user2
        })

        const users = [...room.iterator()]
        expect(users).toHaveLength(3)
        expect(users[0]).toEqual(user0)
        expect(users[1]).toEqual(user1)
        expect(users[2]).toEqual(user2)
    })

})