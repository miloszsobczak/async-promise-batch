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

    it('should call each promise only once', async () => {
        const promise1Callback = jest.fn();
        const promise2Callback = jest.fn();
        const promise3Callback = jest.fn();
        const promise4Callback = jest.fn();

        const response = await runPromises<number | string>([
            () => new Promise(resolve => setTimeout(() => {
                resolve(1);
                promise1Callback();
            }, 10)),
            () => new Promise(resolve => setTimeout(() => {
                resolve(2);
                promise2Callback();
            }, 200)),
            () => new Promise(resolve => setTimeout(() => {
                resolve('3');
                promise3Callback();
            }, 30)),
            () => new Promise(resolve => setTimeout(() => {
                resolve(4);
                promise4Callback();
            }, 40)),
        ], 2);

        expect(response).toEqual([1, 2, '3', 4]);
        expect(promise1Callback).toHaveBeenCalledTimes(1);
        expect(promise2Callback).toHaveBeenCalledTimes(1);
        expect(promise3Callback).toHaveBeenCalledTimes(1);
        expect(promise4Callback).toHaveBeenCalledTimes(1);
    });
});

