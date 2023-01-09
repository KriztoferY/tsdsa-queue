import IQueue from "./Queue";
import CircArrayQueue from "./CircArrayQueue";

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

export { isCircArrayQueue };