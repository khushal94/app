import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorListingPageRoutingModule } from './doctor-listing-routing.module';

import { DoctorListingPage } from './doctor-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorListingPageRoutingModule
  ],
  declarations: [DoctorListingPage]
})
export class DoctorListingPageModule {}
