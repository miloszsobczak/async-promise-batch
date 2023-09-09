import runPromises from '../index';

describe('runPromises', () => {
    it('should return an async iterator', async () => {
        // todo

        const response = await runPromises<number | string>([
            () => new Promise(resolve => setTimeout(() => resolve(1), 10)),
            () => new Promise(resolve => setTimeout(() => resolve(2), 200)),
            () => new Promise(resolve => setTimeout(() => resolve('3'), 30)),
            () => new Promise(resolve => setTimeout(() => resolve(4), 40)),
        ], 2);
        
        expect(response).toEqual([1, 2, '3', 4]);
    });
});

