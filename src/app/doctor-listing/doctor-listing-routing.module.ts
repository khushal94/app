import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorListingPage } from './doctor-listing.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorListingPageRoutingModule {}
