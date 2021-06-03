import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'doctor-detail',
    loadChildren: () => import('./doctor-detail/doctor-detail.module').then( m => m.DoctorDetailPageModule)
  },
  {
    path: 'doctor-listing',
    loadChildren: () => import('./doctor-listing/doctor-listing.module').then( m => m.DoctorListingPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'appointment-list',
    loadChildren: () => import('./appointment-list/appointment-list.module').then( m => m.AppointmentListPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'nurse-listing',
    loadChildren: () => import('./nurse-listing/nurse-listing.module').then( m => m.NurseListingPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'vision',
    loadChildren: () => import('./vision/vision.module').then( m => m.VisionPageModule)
  },
  {
    path: 'order-medicine',
    loadChildren: () => import('./order-medicine/order-medicine.module').then( m => m.OrderMedicinePageModule)
  },
  {
    path: 'search-medicine',
    loadChildren: () => import('./search-medicine/search-medicine.module').then( m => m.SearchMedicinePageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
