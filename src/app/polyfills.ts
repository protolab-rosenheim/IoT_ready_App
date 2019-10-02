import { polyfill } from 'mobile-drag-drop';

polyfill({
    iterationInterval: 20
});

/*Workarround to prevent scrolling on iOS
  see https://github.com/timruffles/mobile-drag-drop/issues/77
  and https://github.com/RubaXa/Sortable/issues/973
  TODO: Check if passive EventListener are supported on our device
  see https://github.com/timruffles/mobile-drag-drop/issues/124
*/
// tslint:disable-next-line:no-empty
window.addEventListener('touchmove', () => { }, { passive: false });
