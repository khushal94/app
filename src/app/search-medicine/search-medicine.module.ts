import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMedicinePageRoutingModule } from './search-medicine-routing.module';

import { SearchMedicinePage } from './search-medicine.page';

import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMedicinePageRoutingModule,
    IonicPullupModule
  ],
  declarations: [SearchMedicinePage]
})
export class SearchMedicinePageModule {}
