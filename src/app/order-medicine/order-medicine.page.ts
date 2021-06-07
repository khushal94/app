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
  public options: any;

  constructor(public camera: Camera, public router: Router, public api: ApiService) { }

  ngOnInit() {
    this.My_Pres();
    this.payWithRazorpay();
  }

  payWithRazorpay() {
    this.options = {
      "key": "rzp_test_SF1Xn1tfhexJK5", // Enter the Key ID generated from the Dashboard
      "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "",
      "name": "",
      "description": "Test Transaction",
      "image": "",
    //  "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": (response: any) => {
        // return response
        this.razorpayHandler(response);
        // alert('Payment Id '+response.razorpay_payment_id);
        // alert('Order Id '+response.razorpay_order_id);
        // alert('Signature '+response.razorpay_signature);
      },
      "prefill": {
        "name": "",
        "email": "",
        "contact": ""
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#e21224"
      }
    };


    this.options.amount = '2000';
    this.options.currency = 'INR';
    this.options.name = 'Khushal Yadav';
  //  this.options.order_id = 'order1212';
    this.options.prefill.name = 'Khushal Yadav';
    this.options.prefill.email = 'Khushal.yadav@outlook.com';
    this.options.prefill.contact = '9785558507';
    //this.options.image = this.user_all_data.profile_img ? this._apiRequest.getAbsolutePath(this.user_all_data.profile_img) : "https://www.jusbid.in/assets/images/logos/Jusbid_logo.png";
    const instance = new this.nativeWindow.Razorpay(
      this.options
    );
    instance.open();

  }

  window(): any {
    // return the global native browser window object
    return window;
  }

  get nativeWindow(): any {
    return window;
  }


  razorpayHandler(response: any) {
    console.log("response", response);
    // let obj = {
    //   userId: this.userData.userId,
    //   username: this.obj.name,
    //   bid_id: this.obj.bidId,
    //   hotel_id: this.obj.hotel_id,
    //   hotel_name: this.obj.hotel_name,
    //   amount: this.obj.amount,
    //   rzp_payment_id: response.razorpay_payment_id,
    //   rzp_order_id: response.razorpay_order_id,
    //   rzp_signature: response.razorpay_signature,
    // }
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
