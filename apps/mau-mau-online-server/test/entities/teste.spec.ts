import { Teste } from "@/entities/teste"

describe("testando", () => {
    test('should pass', () => {
        const t = new Teste()
        expect(t.valor).toBe(10)
    })
})