import { Component, Input } from '@angular/core';
import { Technology } from '../models/portfolio.model';

@Component({
  selector: 'tech-block',
  template: `
      <div class="tech_block">
          <h3>
            {{titleText}}
          </h3>
          <div>
            <span  class="animateOnHover"  [style]="getTechStyle(tech)"
              *ngFor="let tech of techInfo; let i = index">
              <i *ngIf="tech.iconClass" [class]="tech.iconClass"></i>
              <img class="imageicon" *ngIf="tech.iconImage" [src]="tech.iconImage">
              {{tech.title}}
            </span>
          </div>
        </div>
  `,
  styles: [
    `
    @import '../../assets/scss/abstracts/mixins';
    @import '../../assets/scss/abstracts/variables';
        .tech_block {
          font-size: 16px;
          color: $color-black;
          line-height: 1.6;
          background-color: $bg-light;
          border: 1px solid #ddd;
          margin-bottom: 10px;
          padding: 12px 20px;
          @include border-radius(10px);

          h3 {
            font-size: 16px;
            font-weight:600;
            margin-bottom: 10px;
            color: $text-dark;
          }

          span {
            cursor: pointer;
            padding: 8px;
            display: inline-flex;
            align-items: center;
            margin: 8px;
            @include border-radius(10px);
            font-size: 12px;
            background-color: $brand-secondary;

            &.animateOnHover {
              @include transition(transform, 750ms);
              will-change: transform;
              background: $color-black;

              &:hover,
              &:focus {
                transform: translateY(-10px);
              }
            }

            i {
              font-size: 18px;
              margin-right: 5px;
            }

            .imageicon {
              width: 24px;
              height: 24px;
            }
          }
        }

    `,
  ],
})
export class TechBlockComponent {
  @Input() titleText!: string;
  @Input() techInfo!: Technology[];
  getTechStyle(tech: any) {
    return {
      'background-color': tech.bgColor,
      'color': tech.color
    };
  }
}
