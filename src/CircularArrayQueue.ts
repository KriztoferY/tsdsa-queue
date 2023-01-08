import IQueue from "./Queue";

/**
 * Circular array queue -- an implementation of the Queue ADT using a circular
 * array along with a dynamic resizing scheme.
 *
 * @class CircularArrayQueue
 * @typedef {CircularArrayQueue}
 * @template T The type of all elements in the queue.
 * @implements {IQueue<T>}
 */
class CircularArrayQueue<T> implements IQueue<T> {
    /**
     * The underlying array for storing queue elements.
     * @type {T[]} 
     */
    #elems: T[];

    /**
     * Position of the front element in the underlying array.
     * @type {number}
     */
    #startIdx: number;

    /**
     * Number of elements in the queue.
     * @type {number}
     */
    #numElems: number;

    /**
     * Creates an empty queue.
     * @constructor
     * @param {number} [initCapacity=2] Initial anticipated number of elements
     *      to be stored in the queue.
     */
    constructor(initCapacity: number = 2) {
        this.#elems = new Array(initCapacity);
        this.#startIdx = 0;
        this.#numElems = 0;
    }

    /**
     * The maximum number of elements the queue can store without allocating
     * additional memory.
     * @readonly
     * @type {number}
     */
    get #capacity(): number {
        return this.#elems.length;
    }

    /**
     * Position of the one past the last queue element in the underlying array.
     * @readonly
     * @type {number}
     */
    get #endIdx(): number {
        return (this.#startIdx + this.#numElems) / this.#capacity
    }

    /**
     * Growth factor for the underlying array.
     * @static
     * @type {number}
     */
    static #growthFactor: number = 2;

    /**
     * Grows or shrinks the underlying array by a factor of 2.
     * @param {boolean} [grow=true]
     */
    #resize(grow: boolean = true): void {
        if (grow) {
            if (this.#numElems === this.#capacity) {
                this.#elems.length *=
                    CircularArrayQueue.#growthFactor;
            }
        }
        else {
            if (this.#numElems > 0 && 
                this.#numElems * 4 === this.#capacity) {
                this.#elems.length /= 
                    CircularArrayQueue.#growthFactor;
            }
        }
    }

    /**
     * Number of elements in the queue.
     * @readonly
     * @type {number}
     */
    get size(): number {
        return this.#numElems;    
    }

    /**
     * Whether the queue has no elements.
     * @returns {boolean} True if empty.
     */
    empty(): boolean {
        return this.#numElems === 0;
    }

    /**
     * Iterates over all elements in the queue from the front to generate 
     * a string representation of the queue.
     * @param {string} separator - Element separator.
     * @returns {(string | null)} The elements in front-to-end order.
     */
    iter(separator: string = ' '): string | null {
        if (this.size === 0) {
            return null;
        }
        let frontToEnd = '';
        for (let i = this.#startIdx; i < this.#endIdx; i++) {
            frontToEnd = `${frontToEnd}${frontToEnd.length > 0 ? separator : ''}${this.#elems[i]}`;
        }
        return frontToEnd;
    }

    /**
     * Gets the element at the front of the queue if not empty.
     * @returns {(T | null)} The front element.
     */
    front(): T | null {
        if (this.empty()) {
            return null;
        }
        return this.#elems[this.#startIdx];
    }

    /**
     * Adds an element to the end of the queue.
     * @param {T} elem - The elemen to be added.
     */
    enqueue(elem: T): void {
        this.#resize();
        this.#elems[this.#startIdx] = elem;
        ++this.#numElems;
    }

    /**
     * Removes the front element from the queue if not empty.
     * @returns {boolean} True if success.
     */
    deque(): boolean {
        if (this.empty()) {
            return false;
        }
        
        delete this.#elems[this.#startIdx];
        this.#startIdx = (this.#startIdx + 1) / this.#capacity;
        --this.#numElems;
        this.#resize(false);

        return true;
    }
}

export default CircularArrayQueue;