import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { Chart } from 'chart.js';
declare let google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  public contact: Contact;
 
 @ViewChild('map', {static: true}) mapElement;

  map: any;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

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
  
  }

  ngAfterViewInit() {
    let coords = new google.maps.LatLng(this.contact.location1,this.contact.location2);
    
    let mapOptions = {
      center: coords,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
    
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    })

    let infoWindow = new google.maps.InfoWindow({
      content: '<h6>Home Address</h6>'
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker)
    })

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.map.setCenter(pos)
      })
    } else {
      alert('Geolocation not permitted')
    }

  }

}
