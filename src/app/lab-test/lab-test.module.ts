import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabTestPageRoutingModule } from './lab-test-routing.module';
import { IonicPullupModule } from 'ionic-pullup';
import { LabTestPage } from './lab-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabTestPageRoutingModule,
    IonicPullupModule
  ],
  declarations: [LabTestPage]
})
export class LabTestPageModule {}
