import { Room } from "@/entities"

describe('Room entity', () => {
    let room : Room
    beforeEach(() => {
        room = new Room({ id: 'room-id' })
    })

    test('deve ter um id', () => {
        expect(room.getId()).toBe('room-id')
    })

    test.todo('deve permitir adicionar usuário')
    test.todo('deve permitir remover usuário')

})