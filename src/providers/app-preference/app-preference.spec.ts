import { AppPreferenceProvider } from './app-preference';

describe('AppPreference Provider', () => {
    let service: AppPreferenceProvider;

    beforeEach(() => {
        service = new AppPreferenceProvider({} as any, {} as any);
    });

    it('should be created', () => {
        expect(service instanceof AppPreferenceProvider).toBe(true);
    });

    it('should wrap a string in an observable', done => {
        const textToWrap = '127.0.0.1';
        service.wrapInObservable(textToWrap).subscribe(text => {
            expect(text).toEqual(textToWrap);
            done();
        });
    });

    it('should wrap a promise in an observable', done => {
        const textToWrap = '127.0.0.1';
        const promise = Promise.resolve(textToWrap);
        service.wrapInObservable(promise).subscribe(text => {
            expect(text).toEqual(textToWrap);
            done();
        });
    });

});
