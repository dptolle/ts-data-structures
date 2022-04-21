import { GenericUnsortedLinkedList, UnsortedLinkedList } from '../unsorted-linked-list';
import { LinkedListNode } from './../linked-list';

interface DoublyLinkedListNode<T> extends LinkedListNode<T> {
    previous: typeof this | null
}

interface DoublyLinkedList<T> extends UnsortedLinkedList<T, DoublyLinkedListNode<T>> {

}

class DefaultDoublyLinkedList<T> extends GenericUnsortedLinkedList<T, DoublyLinkedListNode<T>> implements DoublyLinkedList<T> {

    addHead(value: T) {
        const adding: DoublyLinkedListNode<T> = new DefaultDoublyLinkedListNode(value, null, this._head);

        if (this._head !== null) {
            this._head.previous = adding;
        }
        this._head = adding;

        if (this._tail === null) {
            this._tail = this._head;
        }
        this._count++;
    }

    addTail(value: T) {
        const adding: DoublyLinkedListNode<T> = new DefaultDoublyLinkedListNode(value, this._tail, null);
        this._addTail(value, adding);
    }


    remove(value: T): DoublyLinkedListNode<T> | null {
        let current = this._head;
        let previous = null;

        while (current !== null) {
            if (current.value === value) {
                break;
            }
            previous = current;
            current = current.next;
        }

        if (current === null) {
            return null;
        }

        const next = current.next;

        if (previous === null) {
            this._head = next;
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

        this._count--;

        return current;
    }

    *[Symbol.iterator]() {
        let current = this._head;
        while (current !== null) {
            yield current;
            current = current.next;
        }
    }
}

class DefaultDoublyLinkedListNode<T> implements DoublyLinkedListNode<T> {

    constructor(public value: T | null, public previous: DoublyLinkedListNode<T> | null, public next: LinkedListNode<T> | null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}

export {
    DefaultDoublyLinkedListNode,
    DoublyLinkedListNode,
    DefaultDoublyLinkedList,
    DoublyLinkedList
}
