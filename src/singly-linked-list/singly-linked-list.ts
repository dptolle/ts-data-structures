import { DefaultSinglyLinkedListNode, SinglyLinkedListNode } from './list-node';

interface SinglyLinkedList<T> extends Iterable<T> {
    readonly count: number;
    readonly head: SinglyLinkedListNode<T>;
    readonly tail: SinglyLinkedListNode<T>;
    addHead(value: T);
    addTail(value: T);
    find(value: T): SinglyLinkedListNode<T> | null;
    contains(value: T): boolean;
    remove(value: T): SinglyLinkedListNode<T> | null;
    [Symbol.iterator]();
}

class DefaultSinglyLinkedList<T> implements SinglyLinkedList<T> {

    private _count: number = 0;
    private _head: SinglyLinkedListNode<T> | null = null;
    private _tail: SinglyLinkedListNode<T> | null = null;

    get count(): number {
        return this._count;
    }

    get head(): SinglyLinkedListNode<T> | null {
        return this._head;
    }

    get tail(): SinglyLinkedListNode<T> | null {
        return this._tail;
    }

    addHead(value: T) {
        const adding: SinglyLinkedListNode<T> = new DefaultSinglyLinkedListNode(value, this._head);

        this._head = adding;

        if (this._tail === null) {
            this._tail = this._head;
        }
        this._count++;
    }

    addTail(value: T) {
        if (this._tail === null) {
            this.addHead(value);
        }
        else {
            const adding: SinglyLinkedListNode<T> = new DefaultSinglyLinkedListNode(value, null);
            this._tail.next = adding;
            this._tail = adding;
            this._count++;
        }
    }

    find(value: T): SinglyLinkedListNode<T> | null {
        let current = this._head;

        while (current !== null) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }

        return null;
    }

    contains(value: T): boolean {
        return Boolean(this.find(value));
    }

    remove(value: T): SinglyLinkedListNode<T> | null {
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


export {
    DefaultSinglyLinkedList,
    SinglyLinkedList
}
