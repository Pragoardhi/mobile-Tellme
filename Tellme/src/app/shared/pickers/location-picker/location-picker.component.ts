import { environment } from './../../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { PlaceService } from 'src/app/form-schedule/place.service';
import { map } from 'rxjs/operators';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  resultGeocode: string;
  constructor(private nativeGeocoder: NativeGeocoder, private modalCtrl: ModalController, private http: HttpClient, private placeSvc: PlaceService) { }

  ngOnInit() {}


  
  async onPickLocation(){
    const modal = await this.modalCtrl.create({
      component: MapModalComponent
    });
    modal.onDidDismiss().then((modalData) => {
      console.log(typeof modalData.data.lat);
      // this.getAddress(modalData.data.lat, modalData.data.lng).subscribe((address) => {
      //   this.placeSvc.setAddress(modalData.data.lat, modalData.data.lng);
      //   console.log(address);
      // });
      var options:NativeGeocoderOptions={
        useLocale:true,
        maxResults: 1
      }

      this.nativeGeocoder.reverseGeocode(modalData.data.lat, modalData.data.lng, options).then((result)=>{
        this.resultGeocode = result[0].countryName;
      });
      this.placeSvc.setAddress(modalData.data.lat, modalData.data.lng, this.resultGeocode);
    });
    return await modal.present();
  }

  // private getAddress(lat: number, lng: number){
  //   return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.mapsAPIKey}`).pipe(
  //     map(geoData => {
  //       if(!geoData || !geoData.results || !geoData.results.length){
  //         return null;
  //       }
  //       return geoData.results[0].formatted_address;
  //     })
  //   )
  // }
}
