interface LinkedList<T, N extends LinkedListNode<T>> extends Iterable<T> {
    readonly count: number;
    readonly head: N;
    readonly tail: N;
    find(value: T, comparator?: ValueComparator<T>): N | null;
    contains(value: T, comparator?: ValueComparator<T>): boolean;
    remove(value: T, comparator?: ValueComparator<T>): N | null;
    [Symbol.iterator]();
}

interface LinkedListNode<T> {
    value: T;
    next: typeof this | null;
}

interface ValueComparator<T> {
    (a: T, b: T): boolean;
}

abstract class GenericLinkedList<T, N extends LinkedListNode<T>> implements LinkedList<T, N> {

    protected _count: number = 0;
    protected _head: N | null = null;
    protected _tail: N | null = null;

    get count(): number {
        return this._count;
    }

    get head(): N | null {
        return this._head;
    }

    get tail(): N | null {
        return this._tail;
    }

    find(value: T, comparator?: ValueComparator<T>): N | null {
        let current = this._head;

        while (current !== null) {

            if (this._isEqual(current.value, value, comparator)) {
                return current;
            }
            current = current.next;
        }

        return null;
    }

    contains(value: T, comparator?: ValueComparator<T>): boolean {
        return Boolean(this.find(value, comparator));
    }

    protected _isEqual(a: T, b: T, comparator?: ValueComparator<T>): boolean {
        return comparator ?
            comparator(a, b) :
            a === b;
    }
    abstract remove(value: T): N;

    *[Symbol.iterator]() {
        let current = this._head;
        while (current !== null) {
            yield current;
            current = current.next;
        }
    }

}


export {
    GenericLinkedList,
    LinkedList,
    LinkedListNode,
    ValueComparator
}
