import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ApiService]
})
export class LoginPage implements OnInit {

  public screen:number = 1;
  public passwordvalue = '';
  public passworderror = false;

  constructor(public router:Router, public api:ApiService) { }

  ngOnInit() {
  }


  loginForm(formvalues){
    this.api.POST('login-patient',formvalues).subscribe(data=>{
      if(data.status == true){
        localStorage.setItem('userdata', JSON.stringify(data.data));
        this.router.navigate(['/dashboard']);
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })
  }


  signupform(formvalues){
    this.api.POST('create-patient',formvalues).subscribe(data=>{
      if(data.status == true){
        this.api.showToast(data.msg, 4000);
        localStorage.setItem('userdata', JSON.stringify(data.data));
        localStorage.setItem('is_loggedin', 'true');
        this.router.navigate(['/dashboard']);
      }else{
        this.api.showToast(data.msg, 4000);
      }

    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })
  }

  Pass(value){
    this.passwordvalue = value;
    console.log(value);
  }

  ChangePass(value){
    if(this.passwordvalue != value){
      this.passworderror = true
    }else{
      this.passworderror = false
    }
  }



}
