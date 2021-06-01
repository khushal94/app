import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-order-medicine',
  templateUrl: './order-medicine.page.html',
  styleUrls: ['./order-medicine.page.scss'],
})
export class OrderMedicinePage implements OnInit {

  public Binary_Prescription:any;
  public image_selected:boolean = false;

  constructor(public camera:Camera) { }

  ngOnInit() {
  }

  GetPicture(){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1500,
      targetHeight:2500,
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.Binary_Prescription = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
     // Handle error
    });
  }

  GetGallery(){
    const options: CameraOptions = {
      quality: 80,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1500,
      targetHeight:2500,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.Binary_Prescription = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
     // Handle error
    });
  }

}
