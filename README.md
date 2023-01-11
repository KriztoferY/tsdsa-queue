# tsdsa-queue <!-- omit in toc -->

<!--intro-start-->

## Introducing TsDSA - Queue <!-- omit in toc -->

**TsDSA - Queue** (`tsdsa-queue`) is a TypeScript/ES6+ library that provides implementations of the Queue ADT and related generic algorithms.

Two implementations of the Queue ADT are included in the project off the shelf:

* `CircArrayQueue<T>` : Circular array based implementation

* `SLListQueue<T>` : Singly linked list based implementation

Different implementations of the Queue ADT are defined in separate modules.

```typescript
import CircArrayQueue from "CircArrayQueue";

const q = new CircArrayQueue<number>(4);

for (let num of [3, 1, 4, 1, 5]) {
    q.enqueue(num);
}

console.log(q.toString(','));           // ~> "[3,1,4,1,5]"

while (!q.empty()) {
    console.log(
        `front = ${q.front()} | size = ${q.size}` +
        `cap = ${q.capacity} -- dequeue()`
    );
    q.dequeue();
}

console.log(`${q.toString(',')} (queue is empty: ${q.empty()})`);
                                        // ~> "[] (queue is empty: true)"
```

A collection of ADT-implementation-agnostic algorithms on the Queue ADT is 
included in a dedicated module.

```typescript
import CircArrayQueue from "CircArrayQueue"
import { mergeQueues } from "Algos"

const nums1 = [4, 7, 2, 10];
const q1 = CircArrayQueue<number>(nums1.length);
for (let num of nums1) {
    q1.enqueue(num);
}

const nums2 = [3, 6, 8, 9, 5, 1];
const q2 = CircArrayQueue<number>(nums2.length);
for (let num of nums2) {
    q2.enqueue(num);
}

// The larger the element value, the higher the priority is given to
// the element when the two queues are stable-merged.
const merged = mergeQueues(
    q1, q2, (a: number, b: number): boolean => (a > b)
);
console.log(`merged : ${merged!.toString(',')}`);
                                        // ~> "merged : [4,7,3,6,8,9,5,2,10,1]"
```
<!--intro-end-->

For more details, visit the <a href="https://KriztoferY.github.io/tsdsa-queue" target="_blank">documentation site</a>.

<!--intro-start-->

## Getting Started <!-- omit in toc -->

Here's what you need to get started.

- [Dependencies](#dependencies)
- [Running Tests](#running-tests)
- [Running Demo Programs](#running-demo-programs)
- [License](#license)

### Dependencies

None, except TypeScript, if you just want to use the modules in the `src/` subdirectory within your own projects.

### Running Tests

Install Jest and its dependencies:

* `"@types/jest": "^29.2.3"`

* `"jest": "^29.3.1"`

* `"ts-jest": "^29.0.3"`
  
Alternatively, you may simply install all development dependencies of the project by executing the following command at the project root directory:

```bash
$ npm install
```

Either way, then you run all tests via the command:

```bash
$ npm test
```

### Running Demo Programs

Install the TypeScript execution engine `ts-node` globally:

```bash
$ npm install -g ts-node
```

Assuming you're now at the project root directory, run

```bash
$ ts-node src/QueueDemo.ts        # demo on usage of interface of Queue ADT
$ ts-node src/QueueMergeDemo.ts   # demo on stable-merge algorithm
```

### License

`tsdsa-queue` is licensed under the <a href="https://github.com/KriztoferY/tsdsa-queue/blob/main/LICENSE" target="_blank">BSD 3-Clause License</a>.

## Also Want It In Another Language? <!-- omit in toc -->

- C : <a href="https://github.com/KriztoferY/cdsa-queue" target="_blank">Repository</a> | <a href="https://KriztoferY.github.io/cdsa-queue" target="_blank">Documentation</a>
- C++ : <a href="https://github.com/KriztoferY/cppdsa-queue" target="_blank">Repository</a> | <a href="https://KriztoferY.github.io/cppdsa-queue" target="_blank">Documentation</a>
- Go : <a href="https://github.com/KriztoferY/godsa-queue" target="_blank">Repository</a> | <a href="https://KriztoferY.github.io/godsa-queue" target="_blank">Documentation</a> [coming soon]
- Python : <a href="https://github.com/KriztoferY/pydsa-queue" target="_blank">Repository</a> | <a href="https://KriztoferY.github.io/pydsa-queue" target="_blank">Documentation</a>

<!--intro-end-->