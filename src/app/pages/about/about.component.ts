import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { About } from '../../models/portfolio.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  aboutData: About;
  constructor(private route: ActivatedRoute) {
    this.aboutData = this.route.snapshot.data['portfolioData'].about;
  }

}
