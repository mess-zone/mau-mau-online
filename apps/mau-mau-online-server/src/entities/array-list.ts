export class ArrayList<T> {
    private elements: T[];
  
    constructor(capacity?: number) {
      if (capacity !== undefined && capacity < 0) {
        throw new Error('Invalid capacity');
      }
      this.elements = capacity !== undefined ? new Array(capacity) : [];
    }
  
    add(element: T): void {
      this.elements.push(element);
    }
  
    addAtIndex(element: T, index: number): void {
      if (index < 0 || index > this.size()) {
        throw new Error('Index out of bounds');
      }
      this.elements.splice(index, 0, element);
    }
  
    clear(): void {
      this.elements = [];
    }
  
    contains(element: T): boolean {
      return this.indexOf(element) !== -1;
    }
  
    get(index: number): T {
      if (index < 0 || index >= this.size()) {
        throw new Error('Index out of bounds');
      }
      return this.elements[index];
    }
  
    indexOf(element: T): number {
      return this.elements.indexOf(element);
    }
  
    isEmpty(): boolean {
      return this.size() === 0;
    }
  
    remove(element: T): T {
      const index = this.indexOf(element);
      if (index === -1) {
        return null;
      }
      return this.removeAtIndex(index);
    }
  
    removeAtIndex(index: number): T {
      if (index < 0 || index >= this.size()) {
        throw new Error('Index out of bounds');
      }
      return this.elements.splice(index, 1)[0];
    }
  
    set(index: number, element: T): void {
      if (index < 0 || index >= this.size()) {
        throw new Error('Index out of bounds');
      }
      this.elements[index] = element;
    }
  
    size(): number {
      return this.elements.length;
    }

    *iterator() {
      for(const element of this.elements) {
        yield element
      }
    }
  }