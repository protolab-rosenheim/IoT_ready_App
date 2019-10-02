import { HistoryProvider } from '../../providers/history/history';

import { ContainerDropzoneComponent } from './container-dropzone';

describe('Container Dropzone', () => {
    let component: ContainerDropzoneComponent;
    let dataTransfer: DataTransfer;
    let emptyDragEvent: DragEvent;

    beforeEach(() => {
        component = new ContainerDropzoneComponent({} as any, {} as any, new HistoryProvider(), {} as any);
        dataTransfer = new DataTransfer();
        dataTransfer.setData('text', JSON.stringify([]));
        emptyDragEvent = new DragEvent('dragstart', { dataTransfer });
    });

    it('should not create a toast on empty drop', () => {
        spyOn(component, 'showToast');
        component.drop(emptyDragEvent);
        expect(component.showToast).not.toHaveBeenCalled();
    });

    it('should not update fill level on empty drop', () => {
        spyOn(component, 'updateFillLevel');
        component.drop(emptyDragEvent);
        expect(component.updateFillLevel).not.toHaveBeenCalled();
    });
});
