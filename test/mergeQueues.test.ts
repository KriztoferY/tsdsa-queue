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

import CircArrayQueue from "../src/CircArrayQueue";
import SLListQueue from "../src/SLListQueue";
import { mergeQueues } from "../src/Algos"


type QueueType = 'array' | 'list';


describe.each([
    { qClass: CircArrayQueue, v: 0, typename: 'number' }, 
    { qClass: CircArrayQueue, v: '', typename: 'string' }, 
    { qClass: SLListQueue, v: 0, typename: 'number' }, 
    { qClass: SLListQueue, v: '', typename: 'string' }
])('mergeQueues<$typename>() with $qClass.name<$typename>', 
({qClass, v, typename}) => {
    const dummyCompare = (a: typeof v, b: typeof v) => true;
    const lt = (a: typeof v, b: typeof v) => Number(a) < Number(b);
    const gt = (a: typeof v, b: typeof v) => Number(a) > Number(b);

    it('throws when two queues are of different types', () => {
        
        if (qClass === CircArrayQueue) {
            const q1 = new qClass<typeof v>();
            const q2 = new SLListQueue<typeof v>();
            const merge = () => mergeQueues(q1, q2, dummyCompare);
            expect(merge).toThrow();
        } else if (qClass === SLListQueue) {
            const q1 = new qClass<typeof v>();
            const q2 = new CircArrayQueue<typeof v>();
            const merge = () => mergeQueues(q1, q2, dummyCompare);
            expect(merge).toThrow();
        }
    });

    it('returns null when both queues are empty', () => {
        const q1 = new qClass<typeof v>();
        const q2 = new qClass<typeof v>();
        expect(mergeQueues(q1, q2, dummyCompare)).toBeNull;
    });

    it('returns queue2 when queue1 is empty', () => {
        const q1 = new qClass<typeof v>();
        const q2 = new qClass<typeof v>();
        for (let num of [3, 1]) {
            q2.enqueue(num);
        }
        const merged = mergeQueues(q1, q2, dummyCompare);
        expect(merged).toBe(q2);
    });

    it('returns queue1 when queue2 is empty', () => {
        const q1 = new qClass<typeof v>();
        for (let num of [3, 1]) {
            q1.enqueue(num);
        }
        const q2 = new qClass<typeof v>();
        const merged = mergeQueues(q1, q2, dummyCompare);
        expect(merged).toBe(q1);
    });

    it('returns a new queue of the same type of both queues to merge when ' +
       'neither is empty', () => {
        const q1 = new qClass<typeof v>();
        for (let num of [3, 1, 4, 1, 5, 9, 2, 6]) {
            q1.enqueue(typeof v === 'string' ? `${num}` : num);
        }
        const q2 = new qClass<typeof v>();
        for (let num of [2, 7, 1, 8, 2, 8]) {
            q1.enqueue(typeof v === 'string' ? `${num}` : num);
        }
        const merged = mergeQueues(q1, q2, gt);
        expect(merged!.size === q1.size + q2.size);
        expect(merged instanceof qClass<typeof v>).toEqual(true);
    });

    it.each([
        { 
            nums1: [1,1,0,2,1], 
            nums2: [0,1,0,1,2], 
            order: '<', 
            expected: [0,1,0,1,1,1,0,2,2,1]
        },
        { 
            nums1: [1,3,5,7,9], 
            nums2: [0,2,4,6,8,42,101], 
            order: '<', 
            expected: [0,1,2,3,4,5,6,7,8,9,42,101]
        },
        {
            nums1: [1,3,5,7,9], 
            nums2: [0,2,4,6,8,42,101], 
            order: '>', 
            expected: [1,3,5,7,9,0,2,4,6,8,42,101]
        },
        {
            nums1: [4,7,2,10], 
            nums2: [3,6,8,9,5,1], 
            order: '<', 
            expected: [3,4,6,7,2,8,9,5,1,10]
        },
        {
            nums1: [4,7,2,10], 
            nums2: [3,6,8,9,5,1], 
            order: '>', 
            expected: [4,7,3,6,8,9,5,2,10,1]
        }
    ])('orders elements correctly wrt given comparator $order\n' +
       'q1: $nums1, q2: $nums2, merged: $expected', 
    ({nums1, nums2, order, expected}) => {
        const q1 = new qClass<typeof v>();
        for (let num of nums1) {
            q1.enqueue(typeof v === 'string' ? `${num}` : num);
        }
        const q2 = new qClass<typeof v>();
        for (let num of nums2) {
            q2.enqueue(typeof v === 'string' ? `${num}` : num);
        }

        const merged = mergeQueues(q1, q2, order === '<' ? lt : gt);
        
        let noMismatch = true;
        let res: typeof v;
        let exp: typeof v;
        for (let [i, num] of expected.entries()) {
            res = typeof v === 'string' ? `${merged!.front()!}` : merged!.front()!;
            exp = typeof v === 'string' ? `${expected[i]}` : expected[i];
            if (res !== exp) { 
                noMismatch = false; 
                break; 
            }
            merged!.dequeue();
        }
        expect(noMismatch).toEqual(true);
    });
});


