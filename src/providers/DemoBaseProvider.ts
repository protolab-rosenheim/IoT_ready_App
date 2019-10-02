import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DemoBaseProvider {
    demoDataFileName: string;

    constructor(public http: HttpClient) {

    }

    getDemoData<T>(demoDataFileName: string): Observable<T[]> {
        const pathToDemoData = './assets/demo-data/' + demoDataFileName;
        return this.http.get<T[]>(pathToDemoData);
    }

    wrapInResponse<T>(data: T[]): WebserviceResponse<T> {
        return {
            'num_results': data.length,
            'objects': data,
            'page': 1,
            'total_pages': 1
        };
    }

}
