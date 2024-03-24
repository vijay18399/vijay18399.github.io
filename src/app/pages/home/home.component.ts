import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intro } from '../../models/portfolio.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  introData: Intro;
  constructor(public route: ActivatedRoute) {
    this.introData = this.route.snapshot.data['portfolioData'].intro;
  }
}
