import IQueue from "./Queue";
import CircArrayQueue from "./CircArrayQueue";
import SLListQueue from './SLListQueue';


/**
 * Tests if a queue is of the circular array queue type.
 * 
 * @template T Type of the elements of the queue to test.
 * @param queue The IQueue-compliant object to test.
 * @returns `true` if the queue is an instance of the generic class 
 *      `CircArrayQueue<T>`.
 */
function isCircArrayQueue<T>(queue: IQueue<T>): queue is CircArrayQueue<T> {
    return queue instanceof CircArrayQueue<T>;
}


/**
 * Creates a deep copy of a queue.
 * 
 * @template T Type of the elements of the queue to clone.
 * @param queue The queue to clone.
 * @returns The clone.
 */
function cloneQueue<T>(queue: IQueue<T>): IQueue<T> {
    const clone = isCircArrayQueue(queue) 
        ? new CircArrayQueue<T>(queue.capacity)
        : new SLListQueue<T>();

    queue.iter((elem: T) => clone.enqueue(elem));

    return clone;
}


export { isCircArrayQueue, cloneQueue };