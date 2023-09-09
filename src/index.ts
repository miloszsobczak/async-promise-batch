export enum Status {
    PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected'
}

export interface QueueItem<T> {
    promiseFn: () => Promise<T>;
    value: T | null;
    status: Status;
}

function range<T>(promises: Array<() => Promise<T>>, limit: number): AsyncIterableIterator<T | null> {
    const queue: Map<symbol, QueueItem<T>> = new Map(
        promises.map(promiseFn => [Symbol(), { promiseFn, value: null, status: Status.PENDING }]));

    queue[Symbol.iterator] = function* (): Generator<[symbol, QueueItem<T>]> {
        const entries: [symbol, QueueItem<T>][] = [];

        queue.forEach((value, key) => {
            if (value.status === Status.PENDING) {
                entries.push([key, value]);
            }
        });

        for (const entry of entries) {
            yield entry;
        }
    };

    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        async next() {
            const pendings: Array<Promise<{
                key: symbol;
                value: T;
            }>> = [];
            // custom iterator outputs only pending promises
            for (const [key, {
                promiseFn,
            }] of queue) {
                if (pendings.length < limit) {
                    pendings.push(promiseFn().then(value => ({ key, value })));
                }
            }

            if (!pendings.length) {
                return {
                    done: true,
                    value: Array.from(queue.values()).map(({ value }) => value)
                };
            }

            const res = await Promise.race(pendings).then(({ key, value }) => {
                const item = queue.get(key);
                if(!item) {
                    return value;
                }

                item.value = value;
                item.status = Status.RESOLVED;
                return value;
            });

            return {
                done: false,
                value: res
            };
        }
    };
}

const runPromises = async <T = unknown>(promises: Array<() => Promise<T>>, limit: number) => {
    const rangeIterator = range(promises, limit);

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const { done, value } = await rangeIterator.next();

        if (done) {
            return value;
        }
    }
};

export default runPromises;

