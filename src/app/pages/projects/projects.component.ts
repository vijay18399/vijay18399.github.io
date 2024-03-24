import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PortfolioItem } from '../../models/portfolio.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: PortfolioItem[] = [];
  constructor(private sanitizer: DomSanitizer,public route: ActivatedRoute) {
    this.projects = this.route.snapshot.data['portfolioData'].projects;
  }
  showLoader = true;
  isModalOpen = false;
  selectedProject: any;
  iframeUrl :any;

  hideLoader() {
    this.showLoader = false;
  }

  onModalOpen(project: any) {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(project.links.live);
    this.selectedProject = project;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
