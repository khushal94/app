import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slide = 1;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  Dashboard(){
    this.SlideShown();
    this.router.navigate(['/dashboard']);
  }

  SlideShown(){
    localStorage.setItem('slide_shown', 'true');
  }

}
