import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService, IMG_Path} from '../../service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [ApiService]
})
export class DashboardPage implements OnInit {
  public slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 10
  };
  public AllData:any;
  public top_doctors = [];
  public featured_doctors = [];
  public Img_Path = IMG_Path;
  public speciality = [];
  public lat:any;
  public long:any;
  constructor(public router:Router, public api:ApiService,
     public geolocation: Geolocation, 
     public nativeGeocoder: NativeGeocoder
    ) { 
      let CheckSlideShowed = localStorage.getItem('slide_shown');

      if(!CheckSlideShowed){
        this.router.navigate(['/intro']);
      }

      this.api.LoaderShow(1, 'Please wait..');

      this.DashboardData();
    }

    public DashboardData(){
      this.api.LoaderShow(0, 'Please wait..');
      this.api.POST('app-landing',{}).subscribe(data=>{
        if(data.status == true){
            this.AllData = data.data;
            this.top_doctors = this.AllData.top_doctors;
            this.featured_doctors = this.AllData.doctors_featured;

            console.log(this.top_doctors, 'top_doctors', this.featured_doctors, 'featured_doctors');
            
        }else{
          this.api.showToast(data.msg, 4000);
        }

  
      },err=>{
        this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
      })


      this.api.GET('specialities').subscribe(data=>{
        if(data.status == true){
            this.speciality = data.data;            
        }  
      },err=>{
      })
    }

  ngOnInit() {

    let env = this;
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    env.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp, 'resp lat long');
      if(resp.coords){
        localStorage.setItem('lat', JSON.stringify(resp.coords.latitude));
        localStorage.setItem('long', JSON.stringify(resp.coords.longitude));
        env.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
        .catch((error: any) => console.log(error));
      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  Detail_Page(doctor_id) {

    this.router.navigate(['/doctor-detail', { doctor_id: doctor_id }]);

  }

  Doctor_Listing_Page(doctor_speciality) {

    this.router.navigate(['/doctor-listing', { doctor_speciality: doctor_speciality }]);

  }

}
