import { List } from "@/entities/list";

describe('List', () => {
  let list: List<number>;

  beforeEach(() => {
    list = new List<number>();
  });

  it('should start with size 0', () => {
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it('should insert an element at the beginning', () => {
    list.insert(1, 0);
    expect(list.size).toBe(1);
    expect(list.isEmpty).toBe(false);
    expect(list.remove(0)).toBe(1);
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it('should insert an element at the end', () => {
    list.insert(1, 0);
    list.insert(2, 1);
    expect(list.size).toBe(2);
    expect(list.isEmpty).toBe(false);
    expect(list.remove(1)).toBe(2);
    expect(list.remove(0)).toBe(1);
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it('should insert an element in the middle', () => {
    list.insert(1, 0);
    list.insert(3, 1);
    list.insert(2, 1);
    expect(list.size).toBe(3);
    expect(list.isEmpty).toBe(false);
    expect(list.remove(1)).toBe(2);
    expect(list.remove(1)).toBe(3);
    expect(list.remove(0)).toBe(1);
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it('should throw an error when inserting an element out of bounds', () => {
    expect(() => list.insert(1, -1)).toThrow('Index out of bounds');
    expect(() => list.insert(1, 1)).toThrow('Index out of bounds');
  });

  it('should remove an element at the beginning', () => {
    list.insert(1, 0);
    expect(list.remove(0)).toBe(1);
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it('should remove an element at the end', () => {
    list.insert(1, 0);
    list.insert(2, 1);
    expect(list.remove(1)).toBe(2);
    expect(list.remove(0)).toBe(1);
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it('should remove an element in the middle', () => {
    list.insert(1, 0);
    list.insert(3, 1);
    list.insert(2, 1);
    expect(list.remove(1)).toBe(2);
    expect(list.remove(1)).toBe(3);
    expect(list.remove(0)).toBe(1);
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it('should throw an error when removing an element out of bounds', () => {
    expect(() => list.remove(-1)).toThrow('Index out of bounds');
    expect(() => list.remove(0)).toThrow('Index out of bounds');
  });

//   it('should iterate over all elements', () => {
//     const values = [1, 2, 3];
//     list.insert(values[0], 0);
//     list.insert(values[1], 1);
//     list.insert(values[2], 2);
//     const callback = jest.fn();
//     list.forEach(callback);
//     expect(callback).toHaveBeenCalledTimes(3);
//     expect(callback.mock.calls[0][0]).toBe(values[0]);
//     expect(callback.mock.calls[1][0]).toBe(values[1]);
//     expect(callback.mock.calls[2][0]).toBe(values[2]);
//   });

  it('should iterate over all elements', () => {
    const values = [1, 2, 3];
    list.insert(values[0], 0);
    list.insert(values[1], 1);
    list.insert(values[2], 2);

    const items = [...list.iterator()]

    expect(items).toEqual(values)
  });
});
