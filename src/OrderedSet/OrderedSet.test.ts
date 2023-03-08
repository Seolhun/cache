import { OrderedSet } from './OrderedSet';

describe('OrderedSet', () => {
  let orderedSet: OrderedSet<number>;

  beforeEach(() => {
    orderedSet = new OrderedSet<number>();
  });

  test('should add values and keep order', () => {
    orderedSet.add(2).add(1).add(3);
    expect(orderedSet.toArray()).toEqual([2, 1, 3]);
  });

  test('should delete values and keep order', () => {
    orderedSet.add(2).add(1).add(3).delete(2);
    expect(orderedSet.toArray()).toEqual([1, 3]);
  });

  test('should return correct size', () => {
    orderedSet.add(2).add(1).add(3);
    expect(orderedSet.size).toBe(3);
  });

  test('should check if set has value', () => {
    orderedSet.add(2).add(1).add(3);
    expect(orderedSet.has(2)).toBe(true);
    expect(orderedSet.has(4)).toBe(false);
  });

  test('should clear set', () => {
    orderedSet.add(2).add(1).add(3).clear();
    expect(orderedSet.size).toBe(0);
    expect(orderedSet.toArray()).toEqual([]);
  });

  test('should iterate over values', () => {
    orderedSet.add(2).add(1).add(3);
    const result: number[] = [];
    for (const value of orderedSet) {
      result.push(value);
    }
    expect(result).toEqual([2, 1, 3]);
  });

  test('should iterate over entries', () => {
    orderedSet.add(2).add(1).add(3);
    const result: [number, number][] = [];
    for (const entry of orderedSet.entries()) {
      result.push(entry);
    }
    expect(result).toEqual([
      [2, 2],
      [1, 1],
      [3, 3],
    ]);
  });

  test('should execute forEach for each value', () => {
    orderedSet.add(2).add(1).add(3);
    const result: number[] = [];
    orderedSet.forEach((value) => {
      result.push(value);
    });
    expect(result).toEqual([2, 1, 3]);
  });
});
