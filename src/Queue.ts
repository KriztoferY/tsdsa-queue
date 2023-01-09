/**
 * The Queue ADT
 * 
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
     * @returns {boolean} `true` if the queue is empty, `false` otherwise.
     */
    empty(): boolean;

    /**
     * Iterates over all elements in the queue from the front to generate 
     * a string representation of the queue.
     * @param {string} separator Element separator.
     * @returns {string | null} The elements in front-to-end order.
     */
    iter(separator: string): string | null;

    /**
     * Gets the element at the front of the queue if not empty.
     * @returns {T | null} The front element.
     */
    front(): T | null;

    /**
     * Adds an element to the end of the queue.
     * @param {T} elem The element to be added.
     */
    enqueue(elem: T): void;

    /**
     * Removes the front element from the queue if not empty.
     * @returns {boolean} `true` on success, `false` otherwise.
     */
    dequeue(): boolean;
}

export default IQueue;