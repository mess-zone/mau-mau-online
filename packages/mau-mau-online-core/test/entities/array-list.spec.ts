import { ArrayList } from "@/entities/array-list";

describe('ArrayList', () => {
  let arrayList: ArrayList<string>;

  beforeEach(() => {
    arrayList = new ArrayList<string>();
  });

  it('should add an element to the end of the list', () => {
    arrayList.add('first');
    arrayList.add('second');
    expect(arrayList.size()).toBe(2);
    expect(arrayList.get(0)).toBe('first');
    expect(arrayList.get(1)).toBe('second');
  });

  it('should add an element at a specific index', () => {
    arrayList.add('first');
    arrayList.add('second');
    arrayList.addAtIndex('middle', 1);
    expect(arrayList.size()).toBe(3);
    expect(arrayList.get(0)).toBe('first');
    expect(arrayList.get(1)).toBe('middle');
    expect(arrayList.get(2)).toBe('second');
  });

  it('should remove an element at a specific index', () => {
    arrayList.add('first');
    arrayList.add('second');
    arrayList.add('third');
    const removed = arrayList.removeAtIndex(1);
    expect(removed).toBe('second')
    expect(arrayList.size()).toBe(2);
    expect(arrayList.get(0)).toBe('first');
    expect(arrayList.get(1)).toBe('third');
  });

  it('should remove a specific element', () => {
    arrayList.add('first');
    arrayList.add('second');
    arrayList.add('third');
    const result = arrayList.remove('second');
    expect(arrayList.size()).toBe(2);
    expect(arrayList.get(0)).toBe('first');
    expect(arrayList.get(1)).toBe('third');
    expect(result).toBe('second')
  });

  it('should check if an element exists in the list', () => {
    arrayList.add('first');
    arrayList.add('second');
    expect(arrayList.contains('first')).toBe(true);
    expect(arrayList.contains('third')).toBe(false);
  });

  it('should clear the list', () => {
    arrayList.add('first');
    arrayList.add('second');
    arrayList.clear();
    expect(arrayList.size()).toBe(0);
    expect(arrayList.isEmpty()).toBe(true);
  });

  it('should set an element at a specific index', () => {
    arrayList.add('first');
    arrayList.add('second');
    arrayList.set(1, 'new second');
    expect(arrayList.size()).toBe(2);
    expect(arrayList.get(1)).toBe('new second');
  });

  it('should return the index of an element', () => {
    arrayList.add('first');
    arrayList.add('second');
    arrayList.add('third');
    expect(arrayList.indexOf('third')).toBe(2);
    expect(arrayList.indexOf('other')).toBe(-1);
  });

  it('should return a list of all elements', () => {
    arrayList.add('first');
    arrayList.add('second');
    arrayList.add('third')

    const cartas = [...arrayList.iterator()]
    expect(cartas).toHaveLength(3)
    expect(cartas[0]).toBe('first')
    expect(cartas[1]).toBe('second')
    expect(cartas[2]).toBe('third')
  });


});