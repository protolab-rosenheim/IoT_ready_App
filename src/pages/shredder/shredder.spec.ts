import { ShredderPage } from './shredder';
import { LoadingMock } from '../../../test-config/mocks-ionic';
import { PartsDroppedProvider } from '../../providers/parts-dropped/parts-dropped';
import { HistoryProvider } from '../../providers/history/history';
import { ArrayHelperProvider } from '../../providers/array-helper/array-helper';
import { FilterProvider } from '../../providers/filter/filter';

describe('Shredder Page', () => {
    let page: ShredderPage;

    let filterPossibilities = ['Einlegeboden', 'Einzeltür links',
        'Einzeltür rechts', 'Klappe', 'Korpusseite'];

    beforeEach(() => {
        page = new ShredderPage({} as any, {} as any, new PartsDroppedProvider(),
            new HistoryProvider(), new LoadingMock() as any,
            new ArrayHelperProvider(), {} as any, new FilterProvider());
        page.filterProperties = ['part_mapping', 'description'];
    });

    it('should be created', () => {
        expect(page instanceof ShredderPage).toBe(true);
    });

    it('should setup filter options', () => {
        const filterOptions = page.setupFilterOptions(filterPossibilities);
        expect(filterOptions).toEqual([{
            isSelected: false,
            name: 'Einlegeboden',
            value: ['Einlegeboden']
        }, {
            isSelected: false,
            name: 'Front',
            value: ['Einzeltür links', 'Einzeltür rechts', 'Klappe']
        },
        {
            isSelected: false,
            name: 'Korpusseite',
            value: ['Korpusseite']
        }]);
    });

});