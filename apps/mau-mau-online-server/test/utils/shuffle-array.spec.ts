import { shuffleArray } from "@/utils/shuffle-array";

describe('shuffleArray', () => {
  it('deve retornar um array com os elementos embaralhados', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray).not.toEqual(originalArray); // o array embaralhado deve ser diferente do array original

    // deve conter os mesmos elementos do array original
    expect(shuffledArray).toContain(1);
    expect(shuffledArray).toContain(2);
    expect(shuffledArray).toContain(3);
    expect(shuffledArray).toContain(4);
    expect(shuffledArray).toContain(5);

    // não deve conter nenhum elemento que não esteja no array original
    expect(shuffledArray).not.toContain(6);
    expect(shuffledArray).not.toContain(7);
    expect(shuffledArray).not.toContain(8);
  });

  it('deve retornar um array vazio quando o array de entrada é vazio', () => {
    const originalArray: number[] = [];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray).toEqual([]);
  });

  it('não deve modificar o array de entrada', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const originalArrayCopy = [...originalArray];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray).not.toEqual(originalArrayCopy);
    expect(originalArray).toEqual(originalArrayCopy);
  });
});
