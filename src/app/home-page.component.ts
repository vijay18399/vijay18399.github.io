import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { WordService } from './shared/services/word.service';
import { LoaderComponent } from './shared/components/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, FlexLayoutModule,LoaderComponent],
  template: `
    <div class="homepage">
      <!-- Header -->
      <header class="header">
        <h1 class="site-title">PORTFOLIO</h1>
      </header>
      <loader class="loader" *ngIf="isLoading">Loading...</loader>
      <!-- Project Cards -->
      <div *ngIf="!isLoading" class="projects">
        <div class="card" *ngFor="let project of projects" [routerLink]="project.route">
          <div class="card-image">
            <img [src]="project.image" [alt]="project.title" />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="footer">
        <p>Hi! I'm Vijay. This is where I make stuff on the web. Obligatory links:</p>
        <div class="links">
          <a class="button" href="mailto:vijayreddy18399@gmail.com">
             <i class="fa fa-envelope" aria-hidden="true"></i>
              Mail
           </a>
          <a class="button" href="https://github.com/vijay18399" target="_blank">
          <i class="devicon-github-original colored"></i>
          Github
          </a>
          <a class="button" href="https://www.linkedin.com/in/vijay18399/" target="_blank">
          <i class="devicon-linkedin-plain colored"></i>
            Linked In
          </a>
          <a class="button" href="vijay_reddy_resume.pdf" target="_blank">
            <i class="fa fa-download "></i>
            Resume
          </a>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .homepage {
        text-align: center;
        padding: 15px;
        color: #ffffff;
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(180deg, #009688, #312C4F);
      }

      .header {
        margin-bottom: 30px;
      }

      .site-title {
        font-size: 2rem;
        margin: 0;
        font-family: fantasy;
        color: white;
      }

      .projects {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
      }

      .card {
        background: #fff;
        border: 2px solid white;
        border-radius: 12px;
        width: 280px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .card-image img {
        width: 280px;
        height: 140px;
        border-radius: 12px;

      }
      .loader{
        height: 150px;
      }
      .card-title {
        margin-top: 10px;
        font-size: 1.1rem;
        font-weight: bold;
        color: #000;
      }

      /* Footer */
      .footer {
        margin-top: 50px;
        font-size: 0.9rem;
      }

      .links {
        margin: 20px 0;
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .button {
        border-radius: 12px;
        padding: 10px 18px 8px 12px;
        display: flex;
        align-items: center;
        color: #312C4F;
        background:white;
        text-decoration: none;
        cursor: pointer;
      }

      .button i{
        margin-right: 10px;
        color : #312C4F;
      }
      .footer p{
        font-weight: 600;
      }
      .footer a {
        text-decoration: none;
        transition: color 0.3s ease;
      }

    `,
  ],
})
export class HomeComponent {
  projects = [
    {
      title: 'Spell Bee Game',
      route: '/spell-bee',
      image: 'images/projects/spell-bee.jpg',
    },
    {
      title: 'Dictionary',
      route: '/dictionary',
      image: 'images/projects/dictionary.png',
    },
    {
      title: 'Paint Tool',
      route: '/paint-tool',
      image: 'images/projects/paint-tool.png',
    },
    {
      title: 'Fruit Fenzy',
      route: '/emoji-war',
      image: 'images/projects/game.png',
    }
  ];
  isLoading: boolean =  false;
  constructor(public wordService:WordService){
    this.wordService.isActive().subscribe((data)=>{
        this.isLoading = false;
    })
  }
}
