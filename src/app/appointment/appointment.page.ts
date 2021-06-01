import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  providers: [ApiService]
})
export class AppointmentPage implements OnInit {

  public current_date:any;
  public Doctor_ID:any;

  constructor(public router: Router, public api:ApiService, public activate: ActivatedRoute) { }

  ngOnInit() {
    this.current_date = new Date().toISOString();
    this.Doctor_ID=this.activate.snapshot.params['doctor_id'];
  }

  Detail_Page(doctor_id) {

    this.router.navigate(['/doctor-detail', { doctor_id: doctor_id }]);

  }

  AppointFormSubmit(formvalues){

    if(formvalues.time_start == 'NaN:NaN' || !formvalues.time_start){
      this.api.showToast('Please select appointment time', 4000);
      return;
    }
    let date_split = formvalues.date.split('T')[0];
    formvalues.date = date_split;
    formvalues.user_id = this.api.Get_UserId();
    formvalues.doctor_id = this.Doctor_ID;

    var d = new Date(formvalues.time_start);
    var final_time_start = d.getUTCHours()+':'+d.getUTCMinutes(); 

    formvalues.time_start = final_time_start;

    this.api.POST('book-appointment',formvalues).subscribe(data=>{
      if(data.status == true){
        this.api.showToast(data.msg, 4000);
        this.router.navigate(['/dashboard']);
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })   

  }
  

}
