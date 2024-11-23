import {
  Component,
  Input,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ToolService } from '../services/tool.service';
import { HistoryCanvas } from '../fabric/utilities';
@Component({
  selector: 'fabric-canvas',
  template: `
    <div #canvasContainer class="canvas-container">
      <canvas id="fabricCanvas"></canvas>
    </div>
  `,
  styles: [
    `
      :host, .canvas-container,#fabricCanvas {
        width: 100%;
        height: 100%;
        position: relative;
        background: white;
        border-radius: 20px;
      }
      canvas {
        display: block;
      }
    `,
  ],
})
export class FabricCanvasComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  _canvas!: any;
  loading: boolean = false;

  constructor(public toolService: ToolService) { }

  ngAfterViewInit() {
    this.initFabricCanvas();
   }

  public initFabricCanvas(callback?: Function) {
    if (this._canvas) {
      this._canvas.dispose();
    }

    const containerWidth = this.canvasContainer.nativeElement.offsetWidth;
    const containerHeight = this.canvasContainer.nativeElement.offsetHeight;

    this._canvas = new HistoryCanvas('fabricCanvas', {
      width: containerWidth,
      height: containerHeight,
      backgroundColor: 'white',
      enableRetinaScaling: false,
    });

    this.toolService.initCanvas(this._canvas);
    this.toolService.addImage('/images/utils/p2.png')
  }



  public getPageData() {
    return {
      canvasData: this._canvas.toJSON(),
      preview: this._canvas.toDataURL(),
    };
  }

  clearAll() {
    this._canvas.clear();
  }

  ngOnDestroy(): void {
    if (this._canvas) {
      this._canvas.dispose();
      console.log('destroyed');
    }
  }
}
