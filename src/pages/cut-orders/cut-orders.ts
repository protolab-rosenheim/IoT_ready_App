import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';

import { MarryingProvider } from '../../providers/marrying/marrying';
import { PartProvider } from '../../providers/part/part';
import { ProGloveProvider } from '../../providers/pro-glove/pro-glove';
import { ShredderProvider } from '../../providers/shredder/shredder';
import { ToastProvider } from '../../providers/toast/toast';
import { FetchCarriageandReorderPartPage } from '../FetchCarriageandReorderPartPage';

/**
 * Generated class for the CutOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cut-orders',
  templateUrl: 'cut-orders.html',
})
export class CutOrdersPage extends FetchCarriageandReorderPartPage {

  productionStepName = 'CU1';

  orders: Order[] = [];
  allOrders: Order[] = [];

  reorderedParts: Part[] = [];
  selectedParts: Part[] = [];
  selectedPartNumbers: number[];
  allPartsSelected = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public toastProvider: ToastProvider,
    public barcodeScanner: BarcodeScanner,
    private marryingProvider: MarryingProvider,
    private alertCtrl: AlertController,
    public shredderProvider: ShredderProvider,
    public modalCtrl: ModalController,
    public partProvider: PartProvider,
    public proGloveProvider: ProGloveProvider,
    public datePipe: DatePipe) {
    super(navCtrl, navParams, modalCtrl, toastProvider, partProvider, proGloveProvider, barcodeScanner, shredderProvider);
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: 'Daten werden geladen'
    });
    loading.present();
    this.shredderProvider.getOrdersByStatus('shreddered').subscribe(data => {
      if (data) {
        this.orders = data.objects;
        loading.dismiss();
      }
    }, () => { loading.dismiss(); });
    this.shredderProvider.getOrders().subscribe(data => {
      this.allOrders = data.objects;
      this.getReorderedParts();
    });
  }

  orderCariage(): void {
    // TODO: Actually order a carriage
    this.toastProvider.presentToast('Ein fahrerloses Transportsystem macht sich auf den Weg zu Ihnen');
  }

  produceClicked(): void {
    const alert = this.alertCtrl.create({
      title: 'An Säge weiterarbeiten',
      subTitle: '',
      buttons: ['Bearbeitung abgeschlossen']
    });
    alert.present();
  }

  marryWithCarriage(carriage_id, order_id): void {
    this.barcodeScanner.scan({ formats: 'QR_CODE' }).then(barcodeData => {
      if (!barcodeData.cancelled) {
        const obj = JSON.parse(barcodeData.text);
        if (obj.data.ip_adress) {
          const ip_adress = obj.data.ip_adress;
          this.marrying(carriage_id, order_id, ip_adress);
        } else {
          this.toastProvider.presentToast('Ip-Adresse nicht erkannt');
        }
      }
    }, () => {
      this.toastProvider.presentToast('Barcode-Scanner nicht verfügbar');
    });
  }

  marrying(carriage_id, order_id, ip_adress): void {
    const loading = this.loadingCtrl.create({
      content: 'Daten werden übertragen'
    });
    loading.present();
    this.shredderProvider.getDataForMarriage(carriage_id, order_id).subscribe(data => {
      const orders = data[0];
      const vCarriages = data[1];
      const asgs = data[2]['objects'];
      const parts = data[3]['objects'];
      const coatings = data[4]['objects'];
      const prodsteps = data[5]['objects'];
      this.marryingProvider.marrying(ip_adress, [orders], [vCarriages], asgs, parts, coatings, prodsteps).subscribe(() => {
        loading.dismiss();
        this.toastProvider.presentToast('Daten erfolgreich übertragen');
      }, () => {
        loading.dismiss();
        this.toastProvider.presentToast('Fehler bei der Datenübertragung');
      });
    });
  }

  getReorderedParts(): void {
    this.shredderProvider.getReorderedParts().subscribe(parts => {
      this.reorderedParts = parts.objects;
    });
  }

  refresh(): void {
    this.getReorderedParts();
  }

  refreshWithShredderedOrders(): void {
    this.shredderProvider.getOrdersByStatus('shreddered').subscribe(data => {
      if (data) {
        this.orders = data.objects;
      }
    });
    this.getReorderedParts();
  }

  getReorderedPartOrderName(order_id: number): string {
    if (order_id) {
      let order: Order;
      this.allOrders.forEach(ord => {
        if (ord.id === order_id) {
          order = ord;
        }
      });
      return order.customer_order;
    }
  }

  getReorderedPartDeliveryDate(order_id: number): string {
    if (order_id) {
      let order: Order;
      this.allOrders.forEach(or => {
        if (or.id === order_id) {
          order = or;
        }
      });
      return this.datePipe.transform(order.delivery_date);
    }
  }

  produceAgain(): void {
    // part exists in shredder and has to be updated in shredder and actual carriage
    this.selectedPartNumbers = [];
    this.selectedParts.forEach(part => {
      this.selectedPartNumbers.push(part.part_number);
    });
    this.shredderProvider.getOrders().subscribe(data => {
      const order_ids = [];
      data.objects.forEach(order => {
        order_ids.push(order.id);
      });
      const order_id = this.searchfreeOrderId(order_ids);
      const orderBody = {
        'id' : order_id,
        'customer_order': 'Reordered ' + this.datePipe.transform(Date.now(), 'dd. MMM yyyy HH:mm:ss'),
        'status': 'shreddered'
      };
      this.shredderProvider.createOrder(orderBody).subscribe(order => {
        const carriage = {
          'order_id': order.id,
          'name': 'Reordered Parts',
          'type': 'Flachwagen'
        };
        this.shredderProvider.createCarriage(carriage).subscribe(virCarr => {
          this.shredderProvider.putManyPartsNotOnboardWithNewOrder(virCarr.id, order.id, this.selectedPartNumbers).subscribe(() => {
            this.toastProvider.presentToast('Ausgewählte Teile werden nachproduziert.');
            this.refreshWithShredderedOrders();
          });
          this.partProvider.putManyPartsNotOnboard(this.selectedPartNumbers).subscribe();
          this.allPartsSelected = false;
          this.selectedParts = [];
        });
      });
    });
  }

  searchfreeOrderId(order_ids): number {
    let id = 1;
    while (order_ids.indexOf(id) !== -1) {
        id += 1;
      }
    return id;
  }

  toggleSelection(selectedPart: Part): void {
    const indexOfPart = this.selectedParts.indexOf(selectedPart);
    if (indexOfPart === -1) {
      this.selectedParts = this.selectedParts.concat(selectedPart);
    } else {
      this.selectedParts.splice(indexOfPart, 1);
    }
  }

  isSelected(part: Part): boolean {
    const indexOfPart = this.selectedParts.indexOf(part);
    return indexOfPart !== -1;
  }

  toggleSelectAll(): void {
    this.selectedParts = [];
    if (!this.allPartsSelected) {
      this.selectedParts = this.selectedParts.concat(this.reorderedParts);
    }
    this.allPartsSelected = !this.allPartsSelected;
  }
}
