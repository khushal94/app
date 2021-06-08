import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IMG_Path } from '../../service';
import { IonPullUpFooterState } from 'ionic-pullup';
@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.page.html',
  styleUrls: ['./lab-test.page.scss'],
  providers: [ApiService]
})
export class LabTestPage implements OnInit {

  public AllTests = [];
  public Get_Packages = [];
  public img_path = IMG_Path;
  public OrderLabTest = [];
  public OrderLabPackage = [];
  public package_id = '';
  public ShowFooter = false;
  public showpackage = {};
  footerState: IonPullUpFooterState;
  constructor(public activate: ActivatedRoute, public api: ApiService) { this.footerState = IonPullUpFooterState.Collapsed; }

  ngOnInit() {
    this.Get_Lab_Tests();
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


  Get_Lab_Tests() {
    this.api.GET('get-lab-tests').subscribe(data => {
      if (data.status == true) {
        this.AllTests = data.data;
      } else {
        this.api.showToast(data.msg, 4000);
      }

    }, err => {
      this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
    });

    this.api.GET('get-packages').subscribe(data => {
      if (data.status == true) {
        this.Get_Packages = data.data;
      } else {
        this.api.showToast(data.msg, 4000);
      }

    }, err => {
      this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
    });



  }

  AddMenu(testdata) {
    this.showpackage = {};
    debugger
    const found = this.OrderLabTest.some(el => el.id === testdata.id);
    if (!found) {
      this.OrderLabTest.push(testdata);
    } else {
      this.api.showToast('This Product is already present in your order list!', 4000);
    }
    this.ShowFooter = true;
  }

  SelectPackage(packagedata) {
    this.OrderLabTest = [];
    if (this.package_id && this.package_id != '') {

    }
    this.package_id = packagedata.id;
    this.showpackage = packagedata;
    this.ShowFooter = true;

  }

  RemovePackage() {
    this.package_id = '';
    this.showpackage = {};
  }

  RemoveMenu(index) {
    if (index > -1) {
      this.OrderLabTest.splice(index, 1);
    }
  }


  PlaceOrder() {

    if (this.OrderLabTest.length != 0) {
      this.api.POST('create-labbooking', { 'user_id': this.api.Get_UserId(), 'test_data': JSON.stringify(this.OrderLabTest) }).subscribe(data => {
        if (data.status == true) {
          this.OrderLabTest = [];
          this.ShowFooter = false;
          this.api.showToast(data.msg, 4000);
        } else {
          this.api.showToast(data.msg, 4000);
        }

      }, err => {
        this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
      })
    }



    if (this.showpackage != {}) {
      this.api.POST('create-labbooking', { 'user_id': this.api.Get_UserId(), 'package_selected': 1, package_id: this.package_id }).subscribe(data => {
        if (data.status == true) {
          this.showpackage = {}; this.package_id = '';
          this.ShowFooter = false;
          this.api.showToast(data.msg, 4000);
        } else {
          this.api.showToast(data.msg, 4000);
        }

      }, err => {
        this.api.showToast('Server Error Occured, Please Try After Sometime ' + err, 4000);
      })
    }

  }

  ///get-lab-tests

}
