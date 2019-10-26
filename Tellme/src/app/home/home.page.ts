// import { google } from '@google/maps';
import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
// declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit{
  map;
  @ViewChild('mapElement', { static: true }) mapElement;
  constructor() {} 
  
  ngOnInit() : void{ 
  }

  ngAfterContentInit() : void{
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,{
        center: {lat: -34.397, lng: 150.664},
        zoom: 8
      })
  } 

}
