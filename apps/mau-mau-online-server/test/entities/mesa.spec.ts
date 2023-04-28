import { Mesa } from "@/entities/mesa";

describe("Mesa entity", () => {
    let mesa: Mesa;

    beforeEach(() => {
        mesa = new Mesa();
    });

    test("deve iniciar vazio de cartas", () => {
       expect(mesa.stack.isEmpty()).toBeTruthy()
    })
})