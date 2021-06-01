import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../service';

@Component({
  selector: 'app-nurse-listing',
  templateUrl: './nurse-listing.page.html',
  styleUrls: ['./nurse-listing.page.scss'],
  providers: [ApiService]
})
export class NurseListingPage implements OnInit {

  public NursesData = [];

  constructor(public router: Router, public api:ApiService, public activate: ActivatedRoute) { }

  ngOnInit() {
    this.getNurses();
  }
  
  getNurses(){
    this.api.POST('get-nurses',{}).subscribe(data=>{
      if(data.status == true){
        this.NursesData = data.data;
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    }) 
  }

}
