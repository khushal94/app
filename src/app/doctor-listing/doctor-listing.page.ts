import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService, IMG_Path} from '../../service';

@Component({
  selector: 'app-doctor-listing',
  templateUrl: './doctor-listing.page.html',
  styleUrls: ['./doctor-listing.page.scss'],
  providers: [ApiService]
})
export class DoctorListingPage implements OnInit {
  public speciality_string = '';
  public all_doctors = [];
  public Img_Path = IMG_Path;

  constructor(public router: Router, public api:ApiService, public activate:ActivatedRoute) { 
    this.speciality_string=this.activate.snapshot.params['doctor_speciality'];
  }

  ngOnInit() {
    this.DoctorSpeData();
  }

  Detail_Page(doctor_id){
    this.router.navigate(['/doctor-detail', { doctor_id: doctor_id }]);
  }

  DoctorSpeData(){

    this.api.POST('doctorby-speciality',{speciality: this.speciality_string}).subscribe(data=>{
      if(data.status == true){
        debugger
        this.all_doctors = data.data;
      
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    }) 

  }

}
