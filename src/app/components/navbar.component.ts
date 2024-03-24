import { Component } from '@angular/core';
import { Config } from '../models/portfolio.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'nav-bar',
  template: `
    <nav *ngIf="config" class="navbar">
      <div routerLink="/" class="navbar-logo">{{ config.brandName }}</div>
      <ul class="navbar-menu">
        <li *ngIf="config.links.home">
          <a routerLink="/home" class="nav-link" [routerLinkActive]="'active'">Home</a>
        </li>
        <li *ngIf="config.links.about">
          <a routerLink="/about" class="nav-link" [routerLinkActive]="'active'">About</a>
        </li>
        <li *ngIf="config.links.work">
          <a routerLink="/work" class="nav-link" [routerLinkActive]="'active'">Work</a>
        </li>
        <li *ngIf="config.links.projects">
          <a routerLink="/projects" class="nav-link" [routerLinkActive]="'active'">Projects</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        background-color: white;
        padding: 8px 20px;
        color: black;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        @media only screen and (max-width: 420px) {
          justify-content: center;
        }
        .navbar-logo {
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
        }

        .navbar-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            padding: 8px;
            a {
              color: rgba(0, 0, 0, 0.3);
              text-decoration: none;
              &:hover,
              &.active {
                color: black;
              }
            }
          }
        }
      }
    `,
  ],
})
export class NavBarComponent {
  config!: Config;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getConfigData().subscribe((config) => {
      this.config = config;
      console.log(this.config);
    });
  }
}
