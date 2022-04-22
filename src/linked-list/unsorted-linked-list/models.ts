import { LinkedList, LinkedListNode } from '../linked-list';
interface UnsortedLinkedList<T, N extends LinkedListNode<T>> extends LinkedList<T, N> {
    addHead(value: T);
    addTail(value: T);
}

interface ReverseIterable {
    getReverseIterator()
}

export {
    UnsortedLinkedList,
    ReverseIterable
}
