import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../service';

@Component({
  templateUrl: './appointment-list.page.html',
  styleUrls: ['./appointment-list.page.scss'],
  providers: [ApiService]
})
export class AppointmentListPage implements OnInit {

  public current_date:any;
  public appointments_data:any = [];

  constructor(public router: Router, public api:ApiService) { }

  ngOnInit() {
    this.api.POST('user-appointments',{user_id: this.api.Get_UserId()}).subscribe(data=>{
      if(data.status == true){
        this.appointments_data = data.data;
      
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })  
  }

  chat(doctor_id){

  }

}