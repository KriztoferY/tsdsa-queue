/**
 * The Queue ADT.
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
     * Iterates over all elements of this queue from the front.
     * 
     * The given operation will be performed on each element iterated.
     *
     * @param action The operation to be performed on each element.
     */
    iter(action: (elem: T) => void): void;

    /**
     * Creates a string representation of this queue.
     *
     * Elements are presented in the queue order from left to right.
     * 
     * @param {string} separator Element separator.
     * @returns {string} The string representation.
     */
    toString(separator: string): string;

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