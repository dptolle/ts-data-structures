
import { GenericSortedLinkedList, SortedLinkedList } from '../sorted-linked-list';

describe('Sorted Linked List', () => {
    let list: SortedLinkedList<number>;

    beforeEach(() => {
        list = new GenericSortedLinkedList<number>((a, b) => a - b);
    });

    it('should return a count of 0', () => {
        expect(list.count).toEqual(0);
    });

    it('should add an item to the list', () => {
        list.add(5);
        expect(list.head.value).toEqual(5);
        expect(list.tail.value).toEqual(5);
        expect(list.count).toEqual(1);
    });

    it('should add 5 items to the list', () => {
        list.add(1);
        list.add(3);
        list.add(5);
        list.add(2);
        list.add(4);
        expect(list.head.value).toEqual(1);
        expect(list.tail.value).toEqual(5);
        expect(list.count).toEqual(5);
    });

    it('should add 5 to the head of the list', () => {
        list.add(1);
        list.add(3);
        list.add(2);
        list.add(4);
        list.add(5, (a, b) => b - a);
        expect(list.head.value).toEqual(5);
        expect(list.tail.value).toEqual(4);
        expect(list.count).toEqual(5);
    });

    it('should contain value 5', () => {
        list.add(4);
        list.add(5);
        expect(list.contains(5)).toBe(true);
    });

    it('should not contain value 6', () => {
        list.add(4);
        list.add(5);
        expect(list.contains(6)).toBe(false);
    });

    it('should find value 4', () => {
        list.add(3);
        list.add(4);
        list.add(5);
        const found = list.find(4);
        expect(found.previous.value).toBe(3);
        expect(found.next.value).toBe(5);
        expect(found.value).toBe(4);
    });

    it('should not find value 6', () => {
        list.add(4);
        list.add(5);
        const found = list.find(6);
        expect(found).toBe(null);
    });

    it('should remove node 3', () => {
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        const removed = list.remove(3);
        expect(removed.value).toBe(3);
        const next = list.find(4);
        const previous = list.find(2);
        expect(previous.value).toBe(2);
        expect(previous.next.value).toBe(4);
        expect(next.value).toBe(4);
        expect(next.previous.value).toBe(2);
        expect(list.count).toEqual(4);
    });

    it('should remove the head node 1', () => {
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        const removed = list.remove(1);
        expect(removed.value).toBe(1);
        expect(list.head.value).toBe(2);
        expect(list.count).toEqual(4);
    });

    it('should remove the tail node 5', () => {
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        const removed = list.remove(5);
        expect(removed.value).toBe(5);
        expect(list.tail.value).toBe(4);
        expect(list.count).toEqual(4);
    });

    it('should remove the tail node of an object list', () => {
        const specialList = new GenericSortedLinkedList<{ name: string }>();
        specialList.add({ name: 'bob' });
        specialList.add({ name: 'kate' });
        specialList.add({ name: 'henry' });
        const comparator = (a, b) => {
            return a.name === b.name;
        }
        const removed = specialList.remove({ name: 'bob' }, comparator);
        expect(removed.value).toEqual({ name: 'bob' });
        expect(specialList.tail.value).toEqual({ name: 'kate' });
        expect(specialList.count).toEqual(2);
    });

    it('should be able to iterate over list from head', () => {
        list.add(5);
        list.add(4);
        list.add(3);
        list.add(2);
        list.add(1);
        let count = 1;
        for (let item of list) {
            expect(item.value).toBe(count);
            count++;
        }
    });

    it('should be able to iterate over list from tail', () => {
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        let count = 5;
        for (let item of list.getReverseIterator()) {
            expect(item.value).toBe(count);
            count--;
        }
    });
})
