import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'container',
  template: `
    <div class="fabric-container" fxLayout="row" fxLayoutAlign="center stretch">
      <!-- Toolbar Section -->
       <tool-bar></tool-bar>
      <!-- Canvas Section -->
      <div class="canvas-section" fxLayout="row" fxLayoutAlign="stretch stretch">
        <fabric-canvas ></fabric-canvas>
        <div class="colors-section" [fxFlex]="isMobile ? '70px' : '140px'">
          <colors></colors>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .fabric-container {
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
      }



      .canvas-section {
        width: 100%;
        height: 100%;
        display: flex;
        background: #fff;
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      fabric-canvas {
        background: #f9f9f9;
        border-right: 1px solid #ddd;
        position: relative;
        border-radius: 20px;
      }

      .colors-section {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 10px;
        overflow-x:hidden;
        overflow-y: auto;
        border-left: 1px solid #ddd;
      }

    `,
  ],
})
export class ContainerComponent implements OnInit {


  isMobile = window.innerWidth <= 768;
  ngOnInit() {}


}
