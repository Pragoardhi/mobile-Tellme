import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
declare var google;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit, AfterContentInit {
  
  map;
  @ViewChild('mapElement', { static: true }) mapElement;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBackForm(){
    this.router.navigateByUrl('/form-schedule');
  }

  ngAfterContentInit() : void{
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,{
        center: {lat: -6.2568530, lng: 106.6183450},
        zoom: 18
      })
  } 


}
