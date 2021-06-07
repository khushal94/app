import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IMG_Path } from '../../service';
import { IonPullUpFooterState } from 'ionic-pullup';



@Component({
  selector: 'app-nurse-listing',
  templateUrl: './nurse-listing.page.html',
  styleUrls: ['./nurse-listing.page.scss'],
  providers: [ApiService]
})
export class NurseListingPage implements OnInit {

  public NursesData = [];
  public ShowFooter: boolean = false;
  footerState: IonPullUpFooterState;
  public SelectedNurse:any = {};
  public IMG_Path_Cla = IMG_Path;
  public time = '';
  public date = '';
  constructor(public router: Router, public api: ApiService, public activate: ActivatedRoute) { this.footerState = IonPullUpFooterState.Collapsed; }

  ngOnInit() {
    this.getNurses();
  }

  footerExpanded() {
    console.log('Footer expanded!');
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  getNurses() {
    this.api.POST('get-nurses', {}).subscribe(data => {
      if (data.status == true) {
        this.NursesData = data.data;
      } else {
        this.api.showToast(data.msg, 4000);
      }

    }, err => {
      this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
    })
  }


  BookNurse() {

    if(this.time == 'NaN:NaN' || !this.time){
      this.api.showToast('Please select appointment time', 4000);
      return;
    }
    let date_split = this.date.split('T')[0];
    this.date = date_split;

    var d = new Date(this.time);
    var final_time_start = d.getUTCHours()+':'+d.getUTCMinutes(); 

    this.time = final_time_start;


    let data = {
      user_id: this.api.Get_UserId(),
      nurse_id:this.SelectedNurse.user_id,
      time:this.time,
      date:this.date
    }
    this.api.POST('nurse-booking', data).subscribe(data => {
      if (data.status == true) {
        this.api.showToast(data.msg, 4000);
        this.ShowFooter = false;
      } else {
        this.api.showToast(data.msg, 4000);
      }

    }, err => {
      this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
    })
  }


  Detail_Page(nurse) {
    this.SelectedNurse = nurse;
    this.constructor = nurse;
    this.ShowFooter = true
  }

}
