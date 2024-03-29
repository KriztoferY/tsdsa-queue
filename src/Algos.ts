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

import IQueue from './Queue';
import CircArrayQueue from './CircArrayQueue';
import { isCircArrayQueue, cloneQueue } from './Utils';
import SLListQueue from './SLListQueue';


/**
 * Stable-merges two queues.
 *
 * Elements are compared using the binary predicate `compare` to determine the 
 * order in which they appear in the merged queue. Relative order of elements 
 * in the original queues is preserved. A new queue is created and returned if 
 * both queues to merge are not empty.
 *
 * @template T Type of the elements in the two queues to merge.
 * @param queue1 A queue to merge. No change after operation.
 * @param queue2 Another queue to merge. No change after operation.
 * @param compare A callable object that determines the element order in the
 *      merged queue; it has not effect on the relative order of elements in
 *      the original queues.
 * @returns The merged queue if both queues to merge are not empty, one of the
 *      queues to merge if the other is empty, `null` if both are empty.
 * @throws Error if the two queues to merge are of different queue types.
 * @note The complexity of the merge algorithm is `O(n1 + n2)` in both time and
 *      space, where `n1` and `n2` are the sizes of the two queues to merge.
 */
function mergeQueues<T>(
    queue1: Readonly<IQueue<T>>, 
    queue2: Readonly<IQueue<T>>, 
    compare: (elem1: T, elem2: T) => boolean): IQueue<T> | null 
{
    if (isCircArrayQueue(queue1) !== isCircArrayQueue(queue2)) {
        throw Error('two queues are not of the same type');
    }

    // No-op if at least 1 queue is empty
    if (queue1.size === 0 && queue2.size === 0) return null;
    if (queue1.size === 0) return queue2;
    if (queue2.size === 0) return queue1;

    // Create a queue of the same type as the two queues to merge
    const merged: IQueue<T> = isCircArrayQueue(queue1) 
        ? new CircArrayQueue<T>(queue1.size + queue2.size)
        : new SLListQueue<T>();

    // Clone the two queues to merge
    queue1 = cloneQueue(queue1);
    queue2 = cloneQueue(queue2);
    
    // Compare the elements at the front of two queues
    let currQueue: IQueue<T> | undefined;
    // let currElem: T | undefined;
    while (!queue1.empty() && !queue2.empty()) {
        currQueue = 
            compare(queue1.front()!, queue2.front()!) ? queue1 : queue2;
        // Enqueue the prioritized element
        merged.enqueue(currQueue.front()!);
        // Remove it from original queue
        currQueue.dequeue();
    }

    // Handle unprocessed tail
    currQueue = queue1.empty() ? queue2 : queue1;
    while (!currQueue.empty()) {
        merged.enqueue(currQueue.front()!);
        currQueue.dequeue();
    }
    
    return merged;
}

export { mergeQueues };