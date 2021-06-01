import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService, IMG_Path} from '../../service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.page.html',
  styleUrls: ['./doctor-detail.page.scss'],
  providers: [ApiService]
})
export class DoctorDetailPage implements OnInit {

  public Doctor_ID  = '';
  public Doctor_Data  = {};
  public Img_Path = IMG_Path;

  constructor(public router:Router, public activate:ActivatedRoute, public api:ApiService) { 

  }

  ngOnInit() {
    
    this.Doctor_ID=this.activate.snapshot.params['doctor_id'];

    this.api.POST('doctor-byid',{user_id:this.Doctor_ID}).subscribe(data=>{
      if(data.status == true){
          this.Doctor_Data = data.data;
          
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })
  }

  appointment(){
    this.router.navigate(['/appointment', { doctor_id: this.Doctor_ID }]);
  }

}
