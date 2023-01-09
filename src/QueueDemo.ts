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
import CircArrayQueue from "./CircArrayQueue";
import SLListQueue from "./SLListQueue";
import { isCircArrayQueue } from "./Utils";

/**
 * Shows how to use the Queue ADT with any implementations.
 * 
 * Guarantees to work with the built-in implementations of the Queue ADT.
 * 
 * @param q A queue to be used to run the demo.
 */
function runQueueDemo<T>(q: IQueue<T>): void {
    console.log(`queue (q) created: size = ${q.size}` +
                (isCircArrayQueue<T>(q) 
                ? ` | cap = ${(q as CircArrayQueue<T>).capacity}`
                : ''));

    console.log(`front(): front = ${q.front()} (q is empty: ${q.empty()})`);
    console.log();
    
    for (let num of [3, 1, 4, 1, 5, 9, 2, 6]) {
        q.enqueue(num as T);
        console.log(`enqueue(${num}): front = ${q.front()} | size = ${q.size}` +
                    (isCircArrayQueue<T>(q) 
                    ? ` | cap = ${(q as CircArrayQueue<T>).capacity}` 
                    : ''));
    }

    console.log(`q: ${q.toString(',')} (queue is empty: ${q.empty()})`);
    console.log();

    console.log('q.iter():');
    let i = 1;
    q.iter((num) => {
        console.log(`position ${i++} : ${num}`);
    });
    console.log();

    while (!q.empty()) {
        console.log(`front = ${q.front()} | size = ${q.size}` +
                    (isCircArrayQueue<T>(q) 
                    ? ` | cap = ${(q as CircArrayQueue<T>).capacity}` 
                    : '') +
                    ` -- dequeue()`);
        q.dequeue();
    }

    console.log(`q: ${q.toString(',')} (queue is empty: ${q.empty()})`);
}

console.log('>>> Circular array queue');
const q1 = new CircArrayQueue(4);
runQueueDemo(q1);

console.log();

console.log('>>> Linked list queue');
const q2 = new SLListQueue();
runQueueDemo(q2);


/* === OUTPUT ===
>>> Circular array queue
queue (q) created: size = 0 | cap = 4
front(): front = null (q is empty: true)

enqueue(3): front = 3 | size = 1 | cap = 4
enqueue(1): front = 3 | size = 2 | cap = 4
enqueue(4): front = 3 | size = 3 | cap = 4
enqueue(1): front = 3 | size = 4 | cap = 4
enqueue(5): front = 3 | size = 5 | cap = 8
enqueue(9): front = 3 | size = 6 | cap = 8
enqueue(2): front = 3 | size = 7 | cap = 8
enqueue(6): front = 3 | size = 8 | cap = 8
q: [3,1,4,1,5,9,2,6] (queue is empty: false)

q.iter():
position 1 : 3
position 2 : 1
position 3 : 4
position 4 : 1
position 5 : 5
position 6 : 9
position 7 : 2
position 8 : 6

front = 3 | size = 8 | cap = 8 -- dequeue()
front = 1 | size = 7 | cap = 8 -- dequeue()
front = 4 | size = 6 | cap = 8 -- dequeue()
front = 1 | size = 5 | cap = 8 -- dequeue()
front = 5 | size = 4 | cap = 8 -- dequeue()
front = 9 | size = 3 | cap = 8 -- dequeue()
front = 2 | size = 2 | cap = 8 -- dequeue()
front = 6 | size = 1 | cap = 4 -- dequeue()
q: [] (queue is empty: true)

>>> Linked list queue
queue (q) created: size = 0
front(): front = null (q is empty: true)

enqueue(3): front = 3 | size = 1
enqueue(1): front = 3 | size = 2
enqueue(4): front = 3 | size = 3
enqueue(1): front = 3 | size = 4
enqueue(5): front = 3 | size = 5
enqueue(9): front = 3 | size = 6
enqueue(2): front = 3 | size = 7
enqueue(6): front = 3 | size = 8
q: [3,1,4,1,5,9,2,6] (queue is empty: false)

q.iter():
position 1 : 3
position 2 : 1
position 3 : 4
position 4 : 1
position 5 : 5
position 6 : 9
position 7 : 2
position 8 : 6

front = 3 | size = 8 -- dequeue()
front = 1 | size = 7 -- dequeue()
front = 4 | size = 6 -- dequeue()
front = 1 | size = 5 -- dequeue()
front = 5 | size = 4 -- dequeue()
front = 9 | size = 3 -- dequeue()
front = 2 | size = 2 -- dequeue()
front = 6 | size = 1 -- dequeue()
q: [] (queue is empty: true)
*/