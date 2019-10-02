import { HttpParams } from '@angular/common/http';

type acceptedFilterValue = string | number | boolean | string[] | number[];

export class Filter {
    name: string;
    op: string;
    val: acceptedFilterValue;

    constructor(name: string, op: string, val: acceptedFilterValue) {
        this.name = name;
        this.op = op;
        this.val = val;
    }

    static toHttpParams(filters: Filter[]): HttpParams {
        return new HttpParams().set('q', JSON.stringify({ 'filters': filters }));
    }
}
