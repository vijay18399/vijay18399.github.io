import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PortfolioItem } from '../models/portfolio.model';
@Component({
  selector: 'info-card',
  template: `
    <div class="card">
      <div class="info">
        <a class="title" target="_blank" [href]="PortfolioItem.links.company">
          {{ PortfolioItem.title }}
        </a>
        <img  *ngIf="PortfolioItem.image"  class="itemImage"  [src]="PortfolioItem.image"
          alt=""
        />
      </div>
      <div *ngIf="PortfolioItem.subTitle" class="position">
        {{ PortfolioItem.subTitle }}
      </div>
      <div *ngIf="PortfolioItem.duration" class="duration">
        <i class="fa fa-history"></i>
        {{ PortfolioItem.duration }}
      </div>
      <div class="description">
        <ul *ngIf="PortfolioItem.tasks && PortfolioItem.tasks.length">
          <li *ngFor="let task of PortfolioItem.tasks">
            <span class="bullet"></span> {{ task }}
          </li>
        </ul>
      </div>
      <div class="buttons">
        <a
          *ngIf="PortfolioItem.links.repo"
          [href]="PortfolioItem.links.repo"
          target="_blank"
        >
          <i class="devicon-github-original "></i> Source Code
        </a>
        <button
          *ngIf="PortfolioItem.links.live"
          class="shake"
          (click)="openLink(PortfolioItem)"
        >
          <i class="fa fa-eye"></i> Try it Live
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @import '../../assets/scss/abstracts/mixins';
      @import '../../assets/scss/abstracts/variables';
      .card {
        cursor: pointer;
        background-color: $bg-light;
        border: 1px solid $border-color;
        border-radius: 8px;
        padding: 20px;
        margin: 10px;
        width: 300px;
        transition: transform 0.3s ease;
        .info {
          @include flex-container(row, space-between, center);
          a {
            text-decoration: none;
          }
        }

        .itemImage {
          max-width: 100%;
          height: 40px;
          padding: 4px;
          border-radius: 10%;
        }

        .title {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: $brand-primary;
        }

        &:hover {
          transform: translateY(-5px);
        }

        .position {
          color: $text-muted;
          margin-bottom: 10px;
        }
        .duration {
          display: inline-block;
          background-color: $bg-dark;
          color: $text-light;
          padding: 0.3em 0.6em;
          border-radius: 0.5em;
          font-size: 0.9em;
          margin-right: 0.5em;
          margin-bottom: 10px;
          i {
            margin-right: 0.3em;
          }
        }

        ul {
          list-style-type: none;
          padding: 0;

          li {
            background-position: 0 5px;
            background-repeat: no-repeat;
            background-size: 12px 12px;
            padding: 2px 0 3px 19px;
            font-size: 15px;
            position: relative;

            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 3px;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 0 12px 12px;
              border-color: transparent transparent $brand-primary transparent; /* Set the color of the triangle */
            }
          }
        }
      }
      .buttons {
        display: flex;
        align-items: center;
        margin-top: 10px;
        a,
        button {
          display: inline-block;
          padding: 8px 16px;
          margin-right: 10px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          color: $color-white;
          background-color: $btn-primary;

          i {
            margin-right: 5px;
          }

          &:hover {
            background-color: $btn-primary-hover;
          }
        }
      }
    `,
  ],
})
export class InfoCardComponent {
  @Input() PortfolioItem!: PortfolioItem;
  @Output() openModal = new EventEmitter<any>();
  openLink(projectData: any) {
    this.openModal.emit(projectData);
  }
}
