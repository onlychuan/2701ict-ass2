import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Contact } from '../models/contact';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { NewContactPage } from '../new-contact/new-contact.page';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public contacts: Observable<Contact[]>;
 con;

  constructor(
    private dataService: DataService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private storage:Storage
  ) {
    this.contacts = this.dataService.getContacts();

  
  }

  ionViewWillEnter() {
    this.loadContacts;
  }

  filterContacts() {
   
    this.loadContacts;
  }

  loadContacts() {
      this.contacts = this.dataService.getContacts();
      // this.con = this.storage.get("con")
  }

  async openNewContactModal() {
    const modal = await this.modalController.create({
      component: NewContactPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onWillDismiss().then(() => {
      this.loadContacts;
    });

    return await modal.present();
  }
}
