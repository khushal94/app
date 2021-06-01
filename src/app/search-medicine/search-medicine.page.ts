import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service';
import { IonPullUpFooterState } from 'ionic-pullup';

@Component({
  selector: 'app-search-medicine',
  templateUrl: './search-medicine.page.html',
  styleUrls: ['./search-medicine.page.scss'],
  providers: [ApiService]
})
export class SearchMedicinePage implements OnInit {

  public DetailsShow: boolean = false;
  public MedicineData = [];
  public ShowFooter: boolean = false;
  public OrderMedicine = [];
  footerState: IonPullUpFooterState;
  constructor(public router: Router, public api: ApiService) {
    this.footerState = IonPullUpFooterState.Collapsed;
  }

  ngOnInit() {
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

  ShowDetails() {
    if (this.DetailsShow) {
      this.DetailsShow = false
    } else {
      this.DetailsShow = true
    }

  }

  SearchNow(formvalues) {
    if (formvalues == '') {
      this.MedicineData = []; return;
    }
    this.api.POST('search-drug', { medicine_name: formvalues }).subscribe(data => {
      if (data.status == true) {
        this.MedicineData = data.data;
      } else {
        this.api.showToast(data.msg, 4000);
      }

    }, err => {
      this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
    })
  }

  AddMenu(medicine) {
    const found = this.OrderMedicine.some(el => el.id === medicine.id);
    if (!found) {
      this.OrderMedicine.push(medicine);
    } else {
      this.api.showToast('This Product is already present in your order list!', 4000);
    }
    this.ShowFooter = true;
  }

  RemoveMenu(index) {
    if (index > -1) {
      this.OrderMedicine.splice(index, 1);
    }
  }

  PlaceOrder() {

    var resultOrderArray = this.OrderMedicine.map(function (obj) {
      return { id: obj.id, trade_name: obj.trade_name, generic_name: obj.generic_name, pharma: obj.pharma, type: obj.type, rate: obj.rate };
    });


    this.api.POST('create-order', { 'medicines': JSON.stringify(resultOrderArray), 'user_id': this.api.Get_UserId() }).subscribe(data => {
      if (data.status == true) {
        this.api.showToast(data.msg, 4000);
      } else {
        this.api.showToast(data.msg, 4000);
      }

    }, err => {
      this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
    })

  }

}
