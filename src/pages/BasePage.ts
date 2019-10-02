import { OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PageProvider } from '../providers/page/page';
import { ProGloveProvider } from '../providers/pro-glove/pro-glove';

export class BasePage implements OnDestroy {
    pageName: string;
    updateLocation: boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public proGloveProvider: ProGloveProvider,
        public pageProvider: PageProvider) {

    }

    ionViewDidLoad() {
        this.updateLocation = true;
        this.goToLocation();
    }

    ngOnDestroy() {
        this.updateLocation = false;
    }

    goToPage(pageName: string): void {
        const pageToGoTo = this.pageProvider.getPage(pageName);
        if (pageToGoTo && !(this.navCtrl.last().instance instanceof pageToGoTo.component)) {
            this.navCtrl.push(pageToGoTo.component);
        }
    }

    goToLocation(): void {
        if (!this.updateLocation) {
            return;
        }

        this.proGloveProvider.getLastAction(1000).subscribe(data => {
            if (data) {
                const newPageName = this.pageProvider.getPageNameByProgloveCode(data.objects.location);
                if (newPageName && newPageName !== this.pageName && newPageName !== 'Home') {
                    this.goToPage(newPageName);
                } else { this.goToLocation(); }
            }
        });
    }
}
