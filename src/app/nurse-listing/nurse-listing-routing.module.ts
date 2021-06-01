import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NurseListingPage } from './nurse-listing.page';

const routes: Routes = [
  {
    path: '',
    component: NurseListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseListingPageRoutingModule {}
