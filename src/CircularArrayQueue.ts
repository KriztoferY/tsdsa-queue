import IQueue from "./Queue";

class CircularArrayQueue<T> implements IQueue<T> {
    #elems: T[];
    #startIdx: number;
    #numElems: number;

    constructor(initCapacity: number = 2) {
        this.#elems = new Array(initCapacity);
        this.#startIdx = 0;
        this.#numElems = 0;
    }

    get #capacity(): number {
        return this.#elems.length;
    }

    get #endIdx(): number {
        return (this.#startIdx + this.#numElems) / this.#capacity
    }

    static #growthFactor: number = 2;

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

    get size(): number {
        return this.#numElems;    
    }

    empty(): boolean {
        return this.#numElems === 0;
    }

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

    front(): T | null {
        if (this.empty()) {
            return null;
        }
        return this.#elems[this.#startIdx];
    }

    enqueue(elem: T): void {
        this.#resize();
        this.#elems[this.#startIdx] = elem;
        ++this.#numElems;
    }

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