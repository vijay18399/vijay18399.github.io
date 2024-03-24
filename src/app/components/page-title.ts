import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-title',
  template: `
      <h2 class="page-title">{{title}}</h2>
  `,
  styles: [
    `
      @import '../../assets/scss/abstracts/variables';
      .page-title {
      font-size: 28px;
      font-weight: bold;
      color: #333;
      text-align: center;
      margin-bottom: 20px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 3px;
        background-color: $brand-primary;
        border-radius: 2px;
      }
    }

    `,
  ],
})
export class PageTitleComponent {
  @Input() title!: string;

}
