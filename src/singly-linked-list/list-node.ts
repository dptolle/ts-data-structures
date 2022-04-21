interface SinglyLinkedListNode<T> {
    value: T;
    next: SinglyLinkedListNode<T>
}

class DefaultSinglyLinkedListNode<T> implements SinglyLinkedListNode<T> {

    public value: T | null = null;
    public next: SinglyLinkedListNode<T> | null = null;

    constructor(value: T | null, next: SinglyLinkedListNode<T> | null) {
        this.value = value;
        this.next = next;
    }
}

export {
    DefaultSinglyLinkedListNode,
    SinglyLinkedListNode
}
