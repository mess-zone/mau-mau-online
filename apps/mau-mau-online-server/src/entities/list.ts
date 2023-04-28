class ListNode<T> {
    public next: ListNode<T> | null = null;
    constructor(public value: T) {}
}
  
export class List<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private _size: number = 0;
  
    public get size() {
      return this._size;
    }
  
    public insert(value: T, index: number) {
      if (index < 0 || index > this._size) {
        throw new Error('Index out of bounds');
      }
      const newNode = new ListNode(value);
      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
        if (!this.tail) {
          this.tail = newNode;
        }
      } else if (index === this._size) {
        this.tail!.next = newNode;
        this.tail = newNode;
      } else {
        let node = this.head;
        for (let i = 0; i < index - 1; i++) {
          node = node!.next;
        }
        newNode.next = node!.next;
        node!.next = newNode;
      }
      this._size++;
    }
  
    public remove(index: number) {
      if (index < 0 || index >= this._size) {
        throw new Error('Index out of bounds');
      }
      let removedNode: ListNode<T>;
      if (index === 0) {
        removedNode = this.head!;
        this.head = this.head!.next;
        if (this._size === 1) {
          this.tail = null;
        }
      } else {
        let node = this.head!;
        for (let i = 0; i < index - 1; i++) {
          node = node.next!;
        }
        removedNode = node.next!;
        node.next = removedNode.next;
        if (index === this._size - 1) {
          this.tail = node;
        }
      }
      this._size--;
      return removedNode.value;
    }
  
    // public forEach(callback: (value: T) => void) {
    //   let node = this.head;
    //   while (node) {
    //     callback(node.value);
    //     node = node.next;
    //   }
    // }

    public *iterator() {
        let node = this.head;
        while (node) {
          yield node.value;
          node = node.next;
        }
    }
  }