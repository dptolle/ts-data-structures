import { GenericLinkedList, LinkedList, LinkedListNode, ValueComparator } from './linked-list';
import { ReverseIterable } from './unsorted-linked-list/models';



interface DoublyLinkedListNode<T> extends LinkedListNode<T> {
    previous: typeof this | null;
}

abstract class AbstractDoublyLinkedList<T, N extends DoublyLinkedListNode<T>> extends GenericLinkedList<T, N> implements LinkedList<T, N>, ReverseIterable {

    remove(value: T, comparator?: ValueComparator<T>): N | null {
        const found = this.find(value, comparator);

        if (found === null) {
            return null;
        }

        const previous = found.previous;
        const next = found.next;

        if (previous === null) {
            this._head = next;
            if (this._head !== null) {
                this._head.previous = null;
            }
        }
        else {
            previous.next = next;
        }

        if (next === null) {
            this._tail = previous;
            if (this._tail !== null) {
                this._tail.next = null;
            }
        }
        else {
            next.previous = previous;
        }

        this._count--;

        return found;
    }

    *getReverseIterator() {
        let current = this._tail;
        while (current !== null) {
            yield current;
            current = current.previous;
        }
    }
}

class GenericDoublyLinkedListNode<T> implements DoublyLinkedListNode<T> {

    constructor(public value: T | null, public previous: DoublyLinkedListNode<T> | null, public next: LinkedListNode<T> | null) {
    }
}

export {
    GenericDoublyLinkedListNode,
    DoublyLinkedListNode,
    AbstractDoublyLinkedList
}
