import { Carta } from "@/entities/carta";
import { Mesa } from "@/entities/mesa";
import { FakeStack } from "@test/doubles/fake-stack";

describe("Mesa entity", () => {
    let fakeStack: FakeStack<Carta>;
    let mesa: Mesa;

    beforeEach(() => {
        fakeStack = new FakeStack<Carta>();
        mesa = new Mesa(fakeStack);
    });

    test("deve iniciar vazio de cartas", () => {
       expect(fakeStack.isEmpty()).toBeTruthy()
    })
})