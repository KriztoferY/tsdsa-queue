interface IQueue<T> {
    get size(): number;
    empty(): boolean;
    iter(separator: string): string | null;
    front(): T | null;
    enqueue(elem: T): void;
    deque(): boolean;
}

export default IQueue;