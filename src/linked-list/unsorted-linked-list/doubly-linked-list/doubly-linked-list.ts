import { AbstractDoublyLinkedList, DoublyLinkedListNode, GenericDoublyLinkedListNode } from '../../abstract-doubly-linked-list';
import { ReverseIterable, UnsortedLinkedList } from '../models';

interface DoublyLinkedList<T> extends UnsortedLinkedList<T, DoublyLinkedListNode<T>>, ReverseIterable {

}

class GenericDoublyLinkedList<T> extends AbstractDoublyLinkedList<T, DoublyLinkedListNode<T>> implements DoublyLinkedList<T> {

    addHead(value: T) {
        const adding: DoublyLinkedListNode<T> = new GenericDoublyLinkedListNode(value, null, this._head);

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
        const adding: DoublyLinkedListNode<T> = new GenericDoublyLinkedListNode(value, this._tail, null);
        if (this._tail === null) {
            this.addHead(value);
        }
        else {
            this._tail.next = adding;
            this._tail = adding;
            this._count++;
        }
    }
}

export {
    GenericDoublyLinkedList,
    DoublyLinkedList
}
