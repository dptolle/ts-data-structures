import { AbstractDoublyLinkedList, DoublyLinkedListNode } from '../abstract-doubly-linked-list';
import { LinkedList, LinkedListNode } from '../linked-list';
import { ReverseIterable } from '../unsorted-linked-list/models';


interface SortedLinkedList<T> extends LinkedList<T, DoublyLinkedListNode<T>>, ReverseIterable {
    add(value: T, sortFunction?: SortFunction<T>);
}

interface SortFunction<T> {
    (a: T, b: T): number;
}

class GenericSortedLinkedList<T> extends AbstractDoublyLinkedList<T, DoublyLinkedListNode<T>> implements SortedLinkedList<T> {
    mainSort: SortFunction<T>;

    constructor(sort?: SortFunction<T>) {
        super();
        this.mainSort = sort ? sort : () => 0;
    }

    add(value: T, sortFunction?: SortFunction<T>) {
        if (this._head === null) {
            //empty list
            this._head = new GenericSortedLinkedListNode(value);
            this._tail = this._head;
        }
        else if (this.sort(this._head.value, value, sortFunction) >= 0) {
            //adding at head
            const newHead = new GenericSortedLinkedListNode(value);
            newHead.next = this._head;
            this._head.previous = newHead;
            this._head = newHead;

        }
        else if (this.sort(this._tail.value, value, sortFunction) <= 0) {
            //adding at tail
            const newTail = new GenericSortedLinkedListNode(value);
            newTail.previous = this._tail;
            this._tail.next = newTail;
            this._tail = newTail;
        }
        else {
            let insertBefore = this._head;
            while (this.sort(insertBefore.value, value, sortFunction) < 0) {
                insertBefore = insertBefore.next;
            }

            const toInsert = new GenericSortedLinkedListNode(value);
            toInsert.next = insertBefore;
            toInsert.previous = insertBefore.previous;
            insertBefore.previous.next = toInsert;
            insertBefore.previous = toInsert;
        }
        this._count++;
    }

    private sort(a: T, b: T, sortFunction?: SortFunction<T>): number {
        return sortFunction ? sortFunction(a, b) : this.mainSort(a, b);
    }

}

class GenericSortedLinkedListNode<T> implements DoublyLinkedListNode<T> {
    public previous: DoublyLinkedListNode<T> | null = null;
    public next: LinkedListNode<T> | null = null;
    constructor(public value: T | null) {
    }
}

export {
    GenericSortedLinkedList,
    SortedLinkedList,
    GenericSortedLinkedListNode
}
