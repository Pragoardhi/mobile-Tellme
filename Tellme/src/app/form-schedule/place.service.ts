import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  currAddress = new BehaviorSubject<string>(``);
  private lat: number;
  private lng: number;
  private addressName: string;

  constructor() { }

  getLat(){
    return this.lat;
  }

  getLng(){
    return this.lng;
  }

  getAddName(){
    return this.addressName;
  }

  setAddress(lat: number, lng:number, addressName: string){
    // this.currAddress.next(address);
    this.lat = lat;
    this.lng = lng;
    this.addressName = addressName;
  }
}