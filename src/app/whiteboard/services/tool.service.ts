import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import cursorMap from '../fabric/cursor.config';
import { perfectHand, TextCreator, BucketFill } from '../fabric/brushes';
import { fabric } from 'fabric';
const EraserBrush = (fabric as any).EraserBrush;
@Injectable({
  providedIn: 'root',
})
export class ToolService {
  public canvas!: any;
  private _toolProperties = new BehaviorSubject<any>({
    color: "#000000",
    width: 10,
    tool: 'pencil',
    fontFamily: 'Chewy-Regular',
    theme: 'default',
    shape: 'circle',
    fill: "#90CAF9",
  });

  toolProperties$: Observable<any> = this._toolProperties.asObservable();
  private tool: any;

  constructor() {
    this.loadCustomFont();
  }

  initCanvas(canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.tool = null;
    this.updateTool(this._toolProperties.value.tool);
  }

  initializeTool(toolInstance: any) {
    this.tool = toolInstance;
    this.tool.color = this._toolProperties.value.color;
    this.tool.width = this._toolProperties.value.width;
    this.tool.fill = this._toolProperties.value.fill;
    this.canvas.freeDrawingBrush = this.tool;
  }

  updateTool(tool: string, prop?: string) {
    this.canvas.off('mouse:wheel');
    this.canvas.off('erasing:end');
    this.canvas.isDrawingMode = true;
    const toolMap: { [key: string]: any } = {
      pencil: perfectHand,
      eraser: EraserBrush,
      text: TextCreator,
      bucketfill: BucketFill,
    };

    const ToolClass = toolMap[tool];
    if (ToolClass) {
      this.initializeTool(new ToolClass(this.canvas));
      if (tool === 'eraser') {
        this.canvas.on('erasing:end', (object: any) => {
          if (object.targets.length) {
            this.canvas.saveHistory();
          }
        });
      } else if (tool === 'text') {
          var ff = this._toolProperties.getValue().fontFamily
          this.tool.setFontFamily && this.tool.setFontFamily(ff);
      }
    }
    this.canvas.freeDrawingCursor = cursorMap[tool] || cursorMap['default'];
    this._toolProperties.next({ ...this._toolProperties.value, tool });
  }

  updateToolProperties(properties: any) {
    this._toolProperties.next({ ...this._toolProperties.value, ...properties });
    this.updateTool(this._toolProperties.value.tool);
  }

  updateColor(color: string) {
    this.updateToolProperties({ color });
  }

  updateFillColor(fill: string) {
    this.updateToolProperties({ fill });
  }

  updateWidth(width: number) {
    this.updateToolProperties({ width });
  }

  updateFontFamily(ff: string) {
    this.updateToolProperties({ fontFamily: ff });
  }


  loadCustomFont() {
    const font = new FontFace('Chewy-Regular', 'url(/fonts/Chewy-Regular.ttf)');
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      console.log('Custom font loaded');
    }).catch((error) => {
      console.error('Failed to load custom font:', error);
    });
  }

  addImage(imageUrl: string) {
    fabric.Image.fromURL(imageUrl, (img: any) => {
      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();
      const imageAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvasWidth / canvasHeight;
      let scaleFactor;
      if (imageAspectRatio > canvasAspectRatio) {
        scaleFactor = canvasWidth / img.width;
      } else {
        scaleFactor = canvasHeight / img.height;
      }
      scaleFactor = Number((scaleFactor).toFixed(2));
      img.set({
        left: 0,
        top: 0,
        angle: 0,
        padding: 10,
        cornerSize: 10,
        hasRotatingPoint: true,
        scaleX: scaleFactor,
        scaleY: scaleFactor
      });
      this.canvas.add(img);
      this.canvas.renderAll()
    });
  }
}
