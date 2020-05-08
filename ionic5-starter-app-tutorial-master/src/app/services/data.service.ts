import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';





@Injectable({
  providedIn: 'root'
})
export class DataService {

  private contacts: Contact[];
 

  private lastId: number = 2;

  constructor(private http: HttpClient, private storage:Storage) {}

  getContacts(): Observable<Contact[]> {
  
    if (this.contacts) {
      return of(this.contacts);
    } else {
      // fetch contacts
      return this.http.get<Contact[]>('./assets/contacts.json')
      .pipe(tap(contacts => this.contacts = contacts));
    }
  }

  getContactById(id: number): Observable<Contact> {
    return this.getContacts().pipe(map(contacts => contacts.find(contact => contact.id == id)));
  }

  createContact(contact: Contact) {
    contact.id = this.lastId + 1;
    // increment lastId value
    this.lastId = this.lastId + 1;
    this.contacts.push(contact);
    
  }

  updateContact(contact: Contact): Contact {
    let itemIndex = this.contacts.findIndex(item => item.id == contact.id);
    this.contacts[itemIndex] = contact;
    return contact;
  }

  deleteContact(id: number): Contact {
    let itemIndex = this.contacts.findIndex(item => item.id == id);
    this.storage.set("con", itemIndex)
    return this.contacts.splice(itemIndex, 1)[0];
  }

 
}
