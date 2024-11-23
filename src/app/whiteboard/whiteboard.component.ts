import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'whiteboard',
  template: `
    <div *ngIf="isPortraitMode" class="portrait-message">
      <div class="rotate-icon">
        <mat-icon class="icon">screen_rotation</mat-icon>
      </div>
      <p class="main-text">Please rotate your device</p>
      <p class="sub-text">This page is best viewed in landscape orientation</p>
    </div>
    <container  class="container" *ngIf="!isPortraitMode"></container>

  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }

      .portrait-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: #000;
        color: #fff;
        text-align: center;
      }

      .rotate-icon {
        font-size: 80px;
        margin-bottom: 20px;
        color: #fff;
      }

      .main-text {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
      }

      .sub-text {
        font-size: 1rem;
        margin: 10px 0 0;
        color: #ccc;
      }

      .container {
        display: flex;
        background: linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147));
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      mat-icon.icon {
        font-size: 22px;
      }
    `,
  ],
})
export class WhiteboardComponent implements OnInit, OnDestroy {
  isPortraitMode: boolean = false;

  constructor() {}

  ngOnInit() {
    this.checkOrientation();
    window.addEventListener('resize', this.checkOrientation.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkOrientation.bind(this));
  }

  checkOrientation() {
    // Check if the screen is in portrait mode
    this.isPortraitMode = window.innerHeight > window.innerWidth;
  }
}
