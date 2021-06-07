import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService, IMG_Path} from '../../service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  providers: [ApiService]
})
export class OrdersPage implements OnInit {

  public AllOrder = [];
  public AllLabTest = [];
  public ShowSection:number = 1;

  constructor(public router:Router, public api:ApiService) { 

  }

  ngOnInit() {

    this.My_Orders();
    this.LabTest();

  }

  My_Orders(){
    
    this.api.POST('get-orders',{user_id:this.api.Get_UserId()}).subscribe(data=>{
      if(data.status == true){
        this.AllOrder = data.data;
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })
  }

  LabTest(){
    this.api.POST('get-labtest-orders',{user_id:this.api.Get_UserId()}).subscribe(data=>{
      if(data.status == true){
        this.AllLabTest = data.data;
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })
    
  }

}
