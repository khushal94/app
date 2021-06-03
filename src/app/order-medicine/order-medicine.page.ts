import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IMG_Path } from '../../service';

declare var RazorpayCheckout: any;


@Component({
  selector: 'app-order-medicine',
  templateUrl: './order-medicine.page.html',
  styleUrls: ['./order-medicine.page.scss'],
  providers: [ApiService]
})
export class OrderMedicinePage implements OnInit {

  public Binary_Prescription: any;
  public image_selected: boolean = false;
  public advices: string = '';
  public AllPres = [];
  public Img_Path = IMG_Path;

  constructor(public camera: Camera, public router: Router, public api: ApiService) { }

  ngOnInit() {
    this.My_Pres();
    this.payWithRazorpay();
  }

  payWithRazorpay() {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      order_id: 'order_DBJOWzybf0sJbb',
      currency: 'INR',
      key: '<YOUR_KEY_ID>',
      amount: '5000',
      name: 'Acme Corp',
      theme: {
        color: '#3399cc'
      }
    }
    var successCallback = function (success) {
      alert('payment_id: ' + success.razorpay_payment_id)
      var orderId = success.razorpay_order_id
      var signature = success.razorpay_signature
    }
    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')')
    }
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options)
  }

  My_Pres() {

    this.api.POST('my-prescriptions', { user_id: this.api.Get_UserId() }).subscribe(data => {
      if (data.status == true) {
        this.AllPres = data.data;
      } else {
        this.api.showToast(data.msg, 4000);
      }

    }, err => {
      this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
    })
  }

  order_now() {
    let data = {
      base64_image: this.Binary_Prescription,
      user_id: this.api.Get_UserId(),
      advices: this.advices
    }
    this.api.POST('upload-prescription', data).subscribe(data => {
      if (data.status == true) {

      } else {
        this.api.showToast(data.msg, 4000);
      }

    }, err => {
      this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
    })
  }

  GetPicture() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1500,
      targetHeight: 2500,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.Binary_Prescription = 'data:image/jpeg;base64,' + imageData;
      this.image_selected = true;
    }, (err) => {
      console.log(err)
      // Handle error
    });
  }

  GetGallery() {
    const options: CameraOptions = {
      quality: 80,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1500,
      targetHeight: 2500,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.Binary_Prescription = 'data:image/jpeg;base64,' + imageData;
      this.image_selected = true;
    }, (err) => {
      console.log(err)
      // Handle error
    });
  }

}
