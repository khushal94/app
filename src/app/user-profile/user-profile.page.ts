import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  providers: [ApiService]
})
export class UserProfilePage implements OnInit {

  public UserData = {};
  public Binary_Img = '';
  public ShowUploaded:boolean = true;

  constructor(public router:Router, public api:ApiService, public camera:Camera) { }

  ngOnInit() {
    this.GetUserData();
  }

  GetUserData(){
    this.api.POST( 'get-userdata', {user_id:this.api.Get_UserId()} ).subscribe(data=>{
      if(data.status == true){
        this.UserData = data.data;
      }else{
        this.api.showToast(data.msg, 4000);
      }
    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })
  }

  updateform(formdata){
    formdata.user_id = this.api.Get_UserId()
    this.api.POST( 'update-user',formdata ).subscribe(data=>{
      if(data.status == true){
        this.api.showToast(data.msg, 4000);
      }else{
        this.api.showToast(data.msg, 4000);
      }
    },err=>{
      this.api.showToast('Server Error Occured, Please Try After Sometime '+err, 4000);
    })
  }

  GetGallery(){
    const options: CameraOptions = {
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 700,
      targetHeight:700,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.Binary_Img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
    });
  }



  

}
