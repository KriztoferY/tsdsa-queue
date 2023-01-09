/*
BSD 3-Clause License

Copyright (c) 2023, KriztoferY (https://github.com/KriztoferY)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import IQueue from "./Queue";

/**
 * Singly linked list node.
 * 
 * @class Node
 * @typedef {Node}
 * @template T Type of value stored in this node.
 */
class Node<T> {
    
    /**
     * Node value.
     * @type {?T}
     */
    value?: T;

    /**
     * Successor node. `null` if the node has no successor.
     * @type {Node<T> | null}
     */
    next: Node<T> | null;

    /**
     * Creates a node with no successor.
     * @template T The type of all elements in the queue.
     * @param value Value to store in the node created.
     */
    constructor(value?: T) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Singly linked list queue -- an implementation of the Queue ADT using a 
 * singly, circularly linked list with a dummy header node whose successor is
 * the tail node (last queue element) when the queue is not empty.
 *
 * @class SLListQueue
 * @typedef {SLListQueue}
 * @template T The type of all elements in the queue.
 * @implements {IQueue<T>}
 */
class SLListQueue<T> implements IQueue<T> {
    /**
     * Dummy header node whose successor is the tail node that stores the last
     * queue element when the queue is not empty.
     * @type {Node<T>}
     */
    #header: Node<T>;

    /**
     * Number of elements in the queue.
     * @type {number}
     */
    #numElems: number;

    /**
     * Creates an empty queue.
     * @constructor
     * @template T The type of all elements in the queue.
     */
    constructor() {
        this.#header = new Node();
        this.#numElems = 0;
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
     * @returns {boolean} `true` if the queue is empty, `false` otherwise.
     */
    empty(): boolean {
        return this.#numElems === 0;
    }

    /**
     * Gets the tail node of the underlying linked list.
     * @returns {Node<T> | null} Tail node if the queue is not empty, `null` 
     *      otherwise.
     */
    #tail(): Node<T> | null {
        return this.#header.next;
    }

    /**
     * Gets the head node of the underlying linked list.
     * @returns {Node<T> | null} Head node if the queue is not empty, `null` 
     *      otherwise.
     */
    #head(): Node<T> | null {
        const tail_node = this.#tail();
        return tail_node ? tail_node.next : null;
    }

    /**
     * Iterates over all elements of this queue from the front.
     * 
     * The given operation will be performed on each element iterated.
     * 
     * @param action The operation to be performed on each element.
     */
    iter(action: (elem: T) => void): void {
        if (this.size === 0) return;    // ruled out head node is null

        let currNode = this.#head();    
        const n = this.size;
        for (let i = 0; i < n; ++i) {
            action(currNode!.value!);   // ruled out null value by enqueue()
            currNode = currNode!.next;
        }
    }

    /**
     * Creates a string representation of this queue.
     *
     * Elements are presented in the queue order from left to right.
     * 
     * @param {string} separator Element separator. Defaults to a single space 
     *      character.
     * @returns {string} The string representation.
     */
    toString(separator: string = ' '): string {
        let frontToEnd = '';
        let currNode = this.#head();      // ruled out currNode is null
        const n = this.size;
        for (let i = 0; i < n; ++i) {
            frontToEnd =
                `${frontToEnd}${frontToEnd.length > 0 ? separator : ''}` +
                `${currNode!.value!}`;
            currNode = currNode!.next;
        }
        return `[${frontToEnd}]`;
    }

    /**
     * Gets the element at the front of the queue if not empty.
     * @returns {T | null} The front element.
     */
    front(): T | null {
        if (this.empty()) {
            return null;
        }
        const value = this.#head()!.value;
        return value ? value : null;
    }

    /**
     * Adds an element to the end of the queue.
     * @param {T} elem The element to be added.
     */
    enqueue(elem: T): void {
        const newNode = new Node(elem);
        if (!this.empty()) {
            // link new tail node to head node
            newNode.next = this.#head();
            // link old tail node to new tail node
            this.#tail()!.next = newNode;  // ruled out tail node is null
        } else {
            // link new tail node to itself as head node
            newNode.next = newNode;
        }
        // link header node to new tail node
        this.#header.next = newNode;
        // increment counter
        ++this.#numElems;
    }

    /**
     * Removes the front element from the queue if not empty.
     * @returns {boolean} `true on success, `false` otherwise.
     */
    dequeue(): boolean {
        if (this.empty()) {
            return false;
        }

        const headNode = this.#head();        // ruled out headNode is null
        if (this.size === 1) {
            // break header node's link to old tail node (also head node)
            this.#header.next = null;
        } else {
            // link tail node to successor of old head node
            this.#tail()!.next = headNode!.next   // ruled out tail node is null
        }
        // break old head node's link to its successor
        headNode!.next = null;
        // decrement counter
        --this.#numElems;

        return true;
    }
}

export default SLListQueue;

export { Node };