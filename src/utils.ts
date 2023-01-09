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