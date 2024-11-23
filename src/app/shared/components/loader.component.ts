import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  standalone:true,
  imports:[],
  template: `
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
  styles: [
    `
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loader {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .loader div {
      width: 16px;
      height: 16px;
      background-color: white;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out;
    }

    .loader div:nth-child(1) {
      animation-delay: -0.32s;
    }

    .loader div:nth-child(2) {
      animation-delay: -0.16s;
    }

    .loader div:nth-child(3) {
      animation-delay: 0;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
    `
  ]
})
export class LoaderComponent {}
