import { ArrayHelperProvider } from './array-helper';

describe('ArrayHelper Provider', () => {
    let service: ArrayHelperProvider;

    const testArray = ['Einzeltür links', 'Einzeltür rechts', 'Klappe', 'Tür-Blende'];
    const numberArray = [8,3,2,6,12,1];

    beforeEach(() => {
        service = new ArrayHelperProvider();
    });

    it('should be created', () => {
        expect(service instanceof ArrayHelperProvider).toBe(true);
    });

    it('should sort an array of strings', () => {
        const sorted = service.sortArray(testArray.reverse());
        expect(sorted).toEqual(testArray);
    });

    it('should sort an array of numbers', () => {
        const sorted = service.sortArray(numberArray);
        expect(sorted).toEqual([1,2,3,6,8,12]);
    });

    it('should not flatten an empty array', () => {
        const flattened = service.flatten([]);
        expect(flattened).toEqual([]);
    });

    it('should flatten a nested array', () => {
        const nestedArray = [testArray];
        const flattened = service.flatten(nestedArray);
        expect(flattened).toEqual(testArray);
    });

    it('should flatten two nested arrays', () => {
        const nestedArray = [testArray, ['Einlegeboden']];
        const flattened = service.flatten(nestedArray);
        expect(flattened).toEqual(['Einzeltür links', 'Einzeltür rechts', 'Klappe', 'Tür-Blende', 'Einlegeboden']);
    });

});
