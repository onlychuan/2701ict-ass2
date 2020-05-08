import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Contact } from '../models/contact';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {
  createContactForm: FormGroup;
  @ViewChild('createForm', { static: false }) createForm: FormGroupDirective;
 imagef 

 selectedImage: any;
  imageUrl: any;
 
  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    // private storage:Storage
  ) { }

  dismissModal() {
    this.modalController.dismiss();
    

  }

  ngOnInit(): void {
    this.createContactForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'workefficiency': new FormControl('', Validators.required),
      'communication': new FormControl('', Validators.required),
      'exective': new FormControl('', Validators.required),
      'individuality': new FormControl('', Validators.required),
      'img': new FormControl('', Validators.required),
      'location1': new FormControl('', Validators.required),
      'location2': new FormControl('', Validators.required) 
    })

    
    

  }

  submitForm() {
    this.createForm.onSubmit(undefined);
  }

  createContact(values: any) {
    // copy all the form values into the new contact
    let newContact: Contact = { ...values };
    this.dataService.createContact(newContact);
    this.dismissModal();

  }
 
  // imageSelected(files){
    
  //   let fileReader = new FileReader()
  
  //   fileReader.onload = e =>{
  //     this.imagef = fileReader.result
  //   }
  //   fileReader.readAsDataURL(files[0]);
    
  // }

  onImageSelected(event) {

    this.selectedImage = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagef = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
   
  }

}
