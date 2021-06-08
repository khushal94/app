import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.page.html',
  styleUrls: ['./coupon-details.page.scss'],
})
export class CouponDetailsPage implements OnInit {
  @Input("coupondata") coupondata;
  constructor() { }

  ngOnInit() {
   console.log(this.coupondata);
  }

}
