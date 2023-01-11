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

describe.each([
    { v: 0, typename: 'Number' }, 
    { v: '', typename: 'String' }, 
])('CircularArrayQueue<$typename>', (v, typename) => {
    it.each([
        [1], [2], [4], [8], [1024], [1024 * 1024]
    ])('can be constructed with positive integral capacity %p', (init_cap: number) => {
        const q = new CircArrayQueue<typeof v>(init_cap);
        expect(q).toBeDefined();
    });

    it.each([
        [0], [-1], [-2], [-4], [-8], [-1024], [-1024 * 1024]
    ])('cannot be constructed with non-positive integral capacity %p', (init_cap: number) => {});

    it.each([
        [0.0], [1.0], [2.78], [-3.1415], [-42], [0.1], [-0.00001]
    ])('cannot be constructed with floating-point capacity %p', (init_cap: number) => {});

    it('should give null when asked for front element and is empty', () => {});

    it('should allow peeking front element when not empty', () => {});

    it('can enqueue when empty', () => {});

    it('can enqueue when not empty and capacity not exceeded', () => {});

    it('can enqueue (and grow underlying array) when capacity exhausted', () => {});

    it('should allow dequeuing when empty', () => {});

    it('can dequeue when not empty and resulting size is at least a quarter of capacity', () => {});

    it('can dequeue (and shrink underlying array) when resulting size drops below a quarter of capacity but is at least 2', () => {});

    it('can dequeue (and do not shrink underlying array) when resulting size drops below a quarter of capacity but is less than 2', () => {});

    it('can generate a string representation when empty', () => {});

    it('can generate a string representation when not empty', () => {});

    it('should allow iteration when empty', () => {});

    it('can iterate over all elements to apply external operation to each element', () => {});

});