import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'bar-chart',is_image:false },
    { title: 'Appointments', url: '/appointment-list', icon: 'calendar',is_image:false },
    { title: 'Nurse', url: '/nurse-listing', icon: 'people',is_image:false },
    // { title: 'Emergency', url: '/folder/Archived', icon: 'heart' },
    { title: 'Upload Prescription', url: '/order-medicine', icon: 'bandage',is_image:false },
    { title: 'Order Medicine', url: '/search-medicine', image:'assets/medicine-icon.png', is_image:true },
    { title: 'My Orders', url: '/orders', icon: 'cart',is_image:false },
    { title: 'FAQ', url: '/faq', icon: 'help',is_image:false },
    { title: 'Support', url: '/support', icon: 'people-circle',is_image:false },
    { title: 'Our Mission & Vision', url: '/vision', icon: 'bulb',is_image:false },
    { title: 'My Profile', url: '/user-profile', icon: 'person-circle',is_image:false },
    // { title: 'Log Out', url: '/folder/Spam', icon: 'log-out' },
    { title: 'Sign In', url: '/login', icon: 'log-in',is_image:false },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
