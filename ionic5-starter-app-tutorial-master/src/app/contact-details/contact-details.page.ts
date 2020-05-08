import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit, AfterViewInit {
  public contact: Contact;
  @ViewChild("radarchart",{static:false}) canvas
  chart:any
  




  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getContactById(parseInt(id, 10))
    .subscribe(contact => {
      // if the contact doesn't exists, return to home page
      if (!contact) {
        this.router.navigate(['/home']);
      } else {
        this.contact = contact;
      }
    });
    alert(this.contact.email)
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.canvas.nativeElement,{
      type:"radar",
      data:{
        labels:["communication","exective","individuality","workefficiency"],
        datasets:[{
          label:"level",
          data:[this.contact.communication,
            this.contact.exective,
            this.contact.individuality,
            this.contact.workefficiency],
            // data:[1,2,3,4],
            backgroudColor:[],
            borderColor:["rgb[255,255,0]"]
        }]
      }
    })


  }


 
}
