import { Stack } from '@/entities/stack'

describe('Stack entity', () => {
    let stack: Stack<number>;
  
    beforeEach(() => {
      stack = new Stack<number>();
    });
  
    it('should create an empty stack', () => {
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
    });
  
    it('should push items onto the stack', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
  
      expect(stack.isEmpty()).toBe(false);
      expect(stack.size()).toBe(3);
      expect(stack.peek()).toBe(3);
    });
  
    it('should pop items off the stack', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
  
      const poppedItem1 = stack.pop();
      expect(poppedItem1).toBe(3);
      expect(stack.size()).toBe(2);
      expect(stack.peek()).toBe(2);
  
      const poppedItem2 = stack.pop();
      expect(poppedItem2).toBe(2);
      expect(stack.size()).toBe(1);
      expect(stack.peek()).toBe(1);
  
      const poppedItem3 = stack.pop();
      expect(poppedItem3).toBe(1);
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
      expect(stack.peek()).toBeUndefined();
    });
  
    it('should return undefined when popping from an empty stack', () => {
      const poppedItem = stack.pop();
  
      expect(poppedItem).toBeUndefined();
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
    });

  });