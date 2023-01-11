/*
BSD 3-Clause License

Copyright (c) 2022, KriztoferY (https://github.com/KriztoferY)
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


const properInitCaps = [
    [1.0], [1], [2], [4], [8], [1024], [1024 * 1024]
];

const elemsTable = [
    [[3]], [[3,1]], [[3,1,4,1,5]], [[3,1,4,1,5,9,2,6]]
];


describe.each([
    { v: 0, typename: 'number' }, 
    { v: '', typename: 'string' }, 
])('CircularArrayQueue<$typename>', ({v, typename}) => {
    const checkFront = <T>(q: CircArrayQueue<T>, nums: Number[]) => {
        if (q.empty()) {
            expect(q.front()).toBeNull();
        } else {
            if (typeof v === 'number') { 
                expect(q.front()).toEqual(nums[0]);
            } else if (typeof v === 'string'){
                expect(q.front()).toEqual(`${nums[0]}`);
            }
        }
    };

    it.each(properInitCaps)('can be constructed with positive integral ' +
                            'capacity %p', (initCap: number) => {
        const q = new CircArrayQueue<typeof v>(initCap);
        expect(q).toBeDefined();
    });

    it.each([
        [0.0], [0], [-1], [-2], [-4], [-8], [-1024], [-1024 * 1024]
    ])('cannot be constructed with non-positive integral capacity %p', 
    (initCap: number) => {
        const createQueue = () => {
            new CircArrayQueue<typeof v>(initCap);
        }
        expect(createQueue).toThrow();
    });

    it.each([
        [2.78], [-3.1415], [-42], [0.1], [-0.00001]
    ])('cannot be constructed with floating-point capacity %p', 
    (initCap: number) => {
        const createQueue = () => {
            new CircArrayQueue<typeof v>(initCap);
        }
        expect(createQueue).toThrow();
    });

    it('should give null when asked for front element and is empty', () => {
        const q = new CircArrayQueue<typeof v>();
        expect(q.front()).toBeNull();
    });

    it.each(elemsTable)('should allow peeking front element when not empty ' +
                        '- elems=%p', (nums: number[]) => {
        const q = new CircArrayQueue<typeof v>(nums.length);
        let num: typeof v;;
        for (num of nums) {
            if (typeof v === 'string') { num = `${num}`; }
            // before
            checkFront<typeof v>(q, nums);
            
            q.enqueue(num);

            // after
            checkFront<typeof v>(q, nums);
        }
    });

    it('can enqueue when empty', () => {
        const initCap = 4;
        const q = new CircArrayQueue<typeof v>(initCap);
        // before
        expect(q.front()).toBeNull();
        expect(q.size).toEqual(0);
        expect(q.capacity).toEqual(initCap);

        q.enqueue(v);
        
        // after
        expect(q.front()).toEqual(v);
        expect(q.size).toEqual(1);
        expect(q.capacity).toEqual(initCap);
    });

    it.each(elemsTable)('can enqueue when not empty and capacity not ' +
                        'exceeded - elems=%p', (nums: number[]) => {
        const initCap = nums.length + 1;
        const q = new CircArrayQueue<typeof v>(initCap);
        let num: typeof v;
        for (num of nums) {
            if (typeof v === 'string') { num = `${num}`; }
            q.enqueue(num);
        }
        // before
        checkFront<typeof v>(q, nums);
        expect(q.size).toEqual(nums.length);
        expect(q.capacity).toEqual(initCap);
        
        q.enqueue(v);
        
        // after
        checkFront<typeof v>(q, nums);
        expect(q.size).toEqual(nums.length + 1);
        expect(q.capacity).toEqual(initCap);
    });

    it.each(elemsTable)('can enqueue (and grow underlying array) when ' +
                        'capacity exhausted - elems=%p', (nums: number[]) => {
        const initCap = nums.length;
        const q = new CircArrayQueue<typeof v>(initCap);
        let num: typeof v;
        for (num of nums) {
            if (typeof v === 'string') { num = `${num}`; }
            q.enqueue(num);
        }
        // before
        checkFront<typeof v>(q, nums);
        expect(q.size).toEqual(nums.length);
        expect(q.capacity).toEqual(initCap);
        
        q.enqueue(v);
        
        // after
        checkFront<typeof v>(q, nums);
        expect(q.size).toEqual(initCap + 1);
        expect(q.capacity).toEqual(initCap * 2);        
    });

    it('should allow dequeuing when empty', () => {
        const q = new CircArrayQueue<typeof v>();
        expect(q.dequeue()).toEqual(false)
    });

    it.each(elemsTable)('can dequeue when not empty and resulting size is ' +
                        'at least a quarter of capacity - elems=%p', 
    (nums: number[]) => {
        const initCap = nums.length;
        const q = new CircArrayQueue<typeof v>(initCap);
        let num: typeof v;
        for (num of nums) {
            if (typeof v === 'string') { num = `${num}`; }
            q.enqueue(num);
        }
        expect(q.dequeue()).toEqual(true);
        expect(q.size).toEqual(nums.length - 1);
        expect(q.capacity).toEqual(initCap);
    });

    it.each(elemsTable)('can dequeue (and shrink underlying array) when ' +
                        'resulting size drops below a quarter of capacity ' + 
                        'is at least 2 - elems=%p', (nums: number[]) => {
        const initCap = nums.length * 4;
        // requires at least 3 elements to start with this test
        if (initCap < 2) { return; }

        const q = new CircArrayQueue<typeof v>(initCap);
        let num: typeof v;
        for (num of nums) {
            if (typeof v === 'string') { num = `${num}`; }
            q.enqueue(num);
        }
        expect(q.dequeue()).toEqual(true);
        expect(q.size).toEqual(nums.length - 1);
        expect(q.capacity).toEqual(Math.floor(initCap / 2));
    });

    it.each([
        [1], [2], [3], [4]
    ])('can dequeue (and do not shrink underlying array) when resulting ' +
       'size drops below a quarter of capacity but is less than 2 - initCap=%p', 
    (initCap: number) => {
        const q = new CircArrayQueue<typeof v>(initCap);
        q.enqueue(v);
        if (initCap > 1) {
            q.enqueue(v);
        }

        // before
        expect(q.size).toEqual(initCap === 1 ? 1 : 2);
        expect(q.capacity).toEqual(initCap);

        expect(q.dequeue()).toEqual(true);

        // after
        expect(q.size).toEqual(initCap === 1 ? 0 : 1);
        expect(q.capacity).toEqual(initCap);
    });

    it.each(properInitCaps)('can generate a string representation when ' +
                            'empty - initCap=%p', (initCap: number) => {
        const q = new CircArrayQueue<typeof v>(initCap);
        expect(q.toString(',')).toEqual('[]');
    });

    it.each([
        { nums: [3], expected: '[3]'}, 
        { nums: [3,1], expected: '[3,1]'}, 
        { nums: [3,1,4,1,5], expected: '[3,1,4,1,5]'}, 
        { nums: [3,1,4,1,5,9,2,6], expected: '[3,1,4,1,5,9,2,6]'}
    ])('can generate a string representation when not empty - elems=$nums', 
    ({nums, expected}) => {
        const initCap = nums.length;
        const q = new CircArrayQueue<typeof v>(initCap);
        let num: typeof v;
        for (num of nums) {
            q.enqueue(num);
        }

        expect(q.toString(',')).toEqual(expected);
    });

    it.each(properInitCaps)('should allow iteration when empty - initCap=%p', 
    (initCap: number) => {
        const q = new CircArrayQueue<typeof v>(initCap);
        expect(q.iter((elem: typeof v) => {})).toBeUndefined();
    });

    it.each(elemsTable)('can iterate over all elements to apply external ' +
                        'operation to each element - elems=%p', 
    (nums: number[]) => {
        const initCap = nums.length;
        const q = new CircArrayQueue<typeof v>(initCap);
        let num: typeof v;
        for (num of nums) {
            q.enqueue(num);
        } 

        let i = 0;
        q.iter((elem: typeof v) => {
            expect(elem).toEqual(nums[i++]);
        });
    });
});