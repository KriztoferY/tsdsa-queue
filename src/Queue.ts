/**
 * The Queue ADT
 * @interface IQueue
 * @typedef {IQueue}
 * @template T The type of all elements in the queue.
 */
interface IQueue<T> {
    /**
     * Number of elements in the queue.
     * @readonly
     * @type {number}
     */
    get size(): number;

    /**
     * Whether the queue has no elements.
     * @returns {boolean} True if empty.
     */
    empty(): boolean;

    /**
     * Iterate over all elements in the queue from the front to generate 
     * a string representation of the queue.
     * @param {string} separator - Element separator.
     * @returns {(string | null)} The elements in front-to-end order.
     */
    iter(separator: string): string | null;

    /**
     * Get the element at the front of the queue if not empty.
     * @returns {(T | null)} The front element.
     */
    front(): T | null;

    /**
     * Add an element to the end of the queue.
     * @param {T} elem - The elemen to be added.
     */
    enqueue(elem: T): void;

    /**
     * Remove the front element from the queue if not empty.
     * @returns {boolean} True if success.
     */
    deque(): boolean;
}

export default IQueue;