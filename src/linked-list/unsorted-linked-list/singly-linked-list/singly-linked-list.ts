import { UnsortedLinkedList } from '../models';
import { GenericLinkedList, LinkedListNode, ValueComparator } from '../../linked-list';

interface SinglyLinkedListNode<T> extends LinkedListNode<T> {
}

interface SinglyLinkedList<T> extends UnsortedLinkedList<T, SinglyLinkedListNode<T>> {
}

class GenericSinglyLinkedList<T> extends GenericLinkedList<T, SinglyLinkedListNode<T>> implements SinglyLinkedList<T> {

    addHead(value: T) {
        const adding: SinglyLinkedListNode<T> = new GenericSinglyLinkedListNode(value, this._head);

        this._head = adding;

        if (this._tail === null) {
            this._tail = this._head;
        }
        this._count++;
    }

    addTail(value: T) {
        const adding: SinglyLinkedListNode<T> = new GenericSinglyLinkedListNode(value, null);
        if (this._tail === null) {
            this.addHead(value);
        }
        else {
            this._tail.next = adding;
            this._tail = adding;
            this._count++;
        }
    }

    remove(value: T, comparator?: ValueComparator<T>): SinglyLinkedListNode<T> | null {
        let current = this._head;
        let previous = null;

        while (current !== null) {
            if (this._isEqual(current.value, value, comparator)) {
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
}

class GenericSinglyLinkedListNode<T> implements SinglyLinkedListNode<T> {

    constructor(public value: T | null, public next: SinglyLinkedListNode<T> | null) {
        this.value = value;
        this.next = next;
    }
}

export {
    GenericSinglyLinkedListNode,
    SinglyLinkedListNode,
    GenericSinglyLinkedList,
    SinglyLinkedList
}
