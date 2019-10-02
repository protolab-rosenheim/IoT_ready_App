import { OpcUaProvider } from './opc-ua';

describe('OPC UA Provider', () => {
    let service: OpcUaProvider;

    beforeEach(() => {
        service = new OpcUaProvider({} as any, {} as any, {} as any);
    });

    it('should be created', () => {
        expect(service instanceof OpcUaProvider).toBe(true);
    });

    it('should create a post body with parameters', () => {
        const postBody = service.createPostBody(['0:Objects', '3:art_net', '3:carriage_1_all_off'],
            'opc.tcp://127.0.0.1:4840/', ['1.1', 'green']);

        expect(postBody).toEqual({
            'methodPath': ['0:Objects', '3:art_net', '3:carriage_1_all_off'],
            'serverUrl': 'opc.tcp://127.0.0.1:4840/',
            'params': ['1.1', 'green']
        });
    });

    it('should create a post body without parameters', () => {
        const postBody = service.createPostBody(['0:Objects', '3:art_net', '3:carriage_1_all_off'],
            'opc.tcp://127.0.0.1:4840/');

        expect(postBody).toEqual({
            'methodPath': ['0:Objects', '3:art_net', '3:carriage_1_all_off'],
            'serverUrl': 'opc.tcp://127.0.0.1:4840/'
        });
    });
});
