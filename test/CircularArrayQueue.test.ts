import CircularArrayQueue from "../src/CircularArrayQueue";

describe.each([
    { v: 0, typename: 'Number' }, 
    { v: '', typename: 'String' }, 
])('CircularArrayQueue<$typename>', (v, typename) => {
    test('can be constructed with positive integral capacity', () => {
        const q = new CircularArrayQueue<typeof v>();
        expect(q).toBeDefined();
    });
});