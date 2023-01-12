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

import CircArrayQueue from "./CircArrayQueue";
import SLListQueue from "./SLListQueue";
import { mergeQueues } from "./Algos";

type QueueType = 'array' | 'list';

/**
 * Shows how to use the non-modifying stable-merge algorithms.
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