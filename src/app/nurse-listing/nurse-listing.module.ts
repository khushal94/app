import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicPullupModule } from 'ionic-pullup';
import { IonicModule } from '@ionic/angular';

import { NurseListingPageRoutingModule } from './nurse-listing-routing.module';

import { NurseListingPage } from './nurse-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseListingPageRoutingModule,
    IonicPullupModule
  ],
  declarations: [NurseListingPage]
})
export class NurseListingPageModule {}
