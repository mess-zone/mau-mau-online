import { Stack } from "@/entities/stack";

export class FakeStack<T> extends Stack<T> {

    constructor() {
        super()
    }

    public _getItemsArray() {
        return this.items
    }
}