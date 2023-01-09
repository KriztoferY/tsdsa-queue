import CircArrayQueue from "./CircArrayQueue";
import SLListQueue from "./SLListQueue";
import { mergeQueues } from "./algos";

type QueueType = 'array' | 'list';

/**
 * Shows how to use the non-invasive stable-merge algorithms.
 * 
 * @param queueType String representation of the implementation of the Queue 
 *      ADT to use to run the demo.
 */
function runMergeQueueDemo(queueType: QueueType): void {
    const nums1 = [4, 7, 2, 10];
    const q1 = queueType === 'array' 
        ? new CircArrayQueue<number>(nums1.length)
        : new SLListQueue<number>();
    for (let num of nums1) {
        q1.enqueue(num);
    }
    console.log(`q1    : ${q1.toString(',')}`);

    const nums2 = [3, 6, 8, 9, 5, 1];
    const q2 = queueType === 'array' 
        ? new CircArrayQueue<number>(nums2.length)
        : new SLListQueue<number>();
    for (let num of nums2) {
        q2.enqueue(num);
    }
    console.log(`q2    : ${q2.toString(',')}`);

    console.log('merging q1 and q2...');

    // The larger the element value, the higher the priority is given to
    // the element when the two queues are stable-merged.
    const mergedGt = mergeQueues(
        q1, q2, (a: number, b: number): boolean => (a > b)
    );
    console.log(`q (>) : ${mergedGt!.toString(',')}`);

    // The smaller the element value, the higher the priority is given to
    // the element when the two queues are stable-merged.
    const mergedLt = mergeQueues(
        q1, q2, (a: number, b: number): boolean => (a < b)
    );
    console.log(`q (<) : ${mergedLt!.toString(',')}`);
}


console.log('>>> Circular array queue');
runMergeQueueDemo('array');

console.log()

console.log('>>> Linked list queue');
runMergeQueueDemo('list');


/* === OUTPUT ===
>>> Circular array queue
q1    : [4,7,2,10]
q2    : [3,6,8,9,5,1]
merging q1 and q2...
q (>) : [4,7,3,6,8,9,5,2,10,1]
q (<) : [3,4,6,7,2,8,9,5,1,10]

>>> Linked list queue
q1    : [4,7,2,10]
q2    : [3,6,8,9,5,1]
merging q1 and q2...
q (>) : [4,7,3,6,8,9,5,2,10,1]
q (<) : [3,4,6,7,2,8,9,5,1,10]
*/