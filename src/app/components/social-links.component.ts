import { Component, Input } from '@angular/core';
import { Link } from '../models/portfolio.model';
@Component({
  selector: 'social-links',
  template: `
    <ul class="social-links">
        <li *ngFor="let link of links">
            <a [href]="link.link" target="_blank">
              <i [class]="link.iconClass"></i>
            </a>
        </li>
    </ul>
  `,
  styles: [
    `
    .social-links {
     width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

      li {
        margin: 0 0 21px;
        display: block;
        text-align: center;
        a {
          color: rgb(188, 190, 192);
          text-decoration: none;
          font-size: 24px;
          &:hover{
            color: #000000;
          }
        }
      }
    }

    `,
  ],
})
export class SocialLinksComponent {
  @Input() links :Link[] = [];
}
