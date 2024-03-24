import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioItem } from '../../models/portfolio.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  workInfo: PortfolioItem[] = [];
  constructor(public route:ActivatedRoute) {
    this.workInfo = this.route.snapshot.data['portfolioData'].workInfo;
  }

}
