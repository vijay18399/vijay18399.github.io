import { Component, inject, OnInit } from '@angular/core';
import { ToolService } from '../services/tool.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'tool-bar',
  template:`
  <div class="tool-bar" fxLayout="column" fxLayoutAlign="space-between center">
  <!-- Action Buttons Section -->
  <div class="tools" fxLayout="column" fxLayoutGap="8px">
    <button
      class="tool-button"
      matTooltip="Draw"
      [ngClass]="{ active: activeTool === 'pencil' }"
      (click)="selectTool('pencil')"
    >
      <div class="icon-container">
        <img class="icon" src="images/tools/file.png" alt="Draw" />
      </div>
    </button>
    <button
      class="tool-button"
      matTooltip="Erase"
      [ngClass]="{ active: activeTool === 'eraser' }"
      (click)="selectTool('eraser')"
    >
      <div class="icon-container">
        <img class="icon" src="images/tools/eraser.png" alt="Erase" />
      </div>
    </button>
    <button
      class="tool-button"
      matTooltip="Paint Bucket"
      [ngClass]="{ active: activeTool === 'bucketfill' }"
      (click)="selectTool('bucketfill')"
    >
      <div class="icon-container">
        <img class="icon" src="images/tools/bucketfill.png" alt="Paint Bucket" />
      </div>
    </button>
    <button
      class="tool-button"
      matTooltip="Text"
      [ngClass]="{ active: activeTool === 'text' }"
      (click)="selectTool('text')"
    >
      <div class="icon-container">
        <img class="icon" src="images/tools/text.png" alt="Text Tool" />
      </div>
    </button>
    <!-- Other Action Buttons -->
    <button class="tool-button" matTooltip="Clear" (click)="clear()">
      <div class="icon-container">
        <img class="icon" src="images/tools/clear.png" alt="Clear" />
      </div>
    </button>
    <button class="tool-button" matTooltip="Add Image" (click)="selectImage()">
      <div class="icon-container">
        <img class="icon" src="images/tools/add_image.png" alt="Add Image" />
      </div>
    </button>
    <button
      [disabled]="!canUndo"
      class="tool-button"
      matTooltip="Undo"
      (click)="undo()"
    >
      <div class="icon-container">
        <img class="icon" src="images/tools/undo.svg" alt="Undo" />
      </div>
    </button>
    <button
      [disabled]="!canRedo"
      class="tool-button"
      matTooltip="Redo"
      (click)="redo()"
    >
      <div class="icon-container">
        <img class="icon" src="images/tools/redo.svg" alt="Redo" />
      </div>
    </button>
    <button class="tool-button" matTooltip="Save" (click)="saveCanvas()">
      <div class="icon-container">
        <img class="icon" src="images/tools/download.svg" alt="Save" />
      </div>
    </button>
  </div>
</div>

`
  ,
  styles: [
     `

:host {
  margin-right: 10px;
}
.tool-bar {
  padding: 10px;
  background: #f9fbe7;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.tool-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tool-button:hover {
  background: #80CBC4;
}

.tool-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tool-button.active {
  background: #80CBC4;
}

.icon-container {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.icon {
  width: 24px;
  height: 24px;
}
/* Mobile Responsive Design */
@media (max-width: 768px) {
  .tool-bar {
    padding: 8px;
    background: #ffffff;
    box-shadow: none;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .tool-button {
    width: 40px;
    height: 40px;
    margin-bottom: 2px !important;

  }

  .icon-container {
    width: 32px;
    height: 32px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}

/* Smaller Devices */
@media (max-width: 480px) {
  .tool-bar {
    padding: 6px;
  }

  .tool-button {
    width: 36px;
    height: 36px;
    margin: 2px;
  }

  .icon-container {
    width: 28px;
    height: 28px;
  }

  .icon {
    width: 16px;
    height: 16px;
  }
}

      `
  ],
})
export class ToolBarComponent  {
  activeTool: string = 'pencil'; // Default active tool
  width: number = 5; // Default stroke width
  selectedFontFamily: string = 'Chewy-Regular'; // Default font family

  fontFamilies: string[] = [
    'Chewy-Regular',
    'Times New Roman',
    'Impact',
    'Courier New',
    'Comic Sans MS',
  ];
  private toastService = inject(HotToastService);

  constructor(private toolService: ToolService) {
    this.toolService.toolProperties$.subscribe((properties) => {
      this.width = properties.width;
      this.selectedFontFamily = properties.fontFamily || 'Arial';
      this.activeTool = properties.tool;
    });
  }

  ngOnInit(): void {}

  selectTool(tool: string) {
    this.activeTool = tool; // Update active tool
    this.toolService.updateTool(tool);
  }
  get canvas(){
   return  this.toolService.canvas;
  }
  get canUndo(){
    return  this.toolService?.canvas?.canUndo();
   }
   get canRedo(){
    return  this.toolService?.canvas?.canRedo();
   }
  undo() {
    this.toolService.canvas.undo(); // Add undo implementation in ToolService if not present
  }

  redo() {
    this.toolService.canvas.redo(); // Add redo implementation in ToolService if not present
  }

  saveCanvas() {
    const dataURL = this.toolService.canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard.png';
    link.click();
  }

  onInputChange(event: any) {
    this.width = +event.target.value;
    this.toolService.updateWidth(this.width);
  }

  updateFontFamily(event: any) {
    this.selectedFontFamily = event.value;
    this.toolService.updateFontFamily(this.selectedFontFamily);
  }

  selectImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        if (file.type !== 'image/png') {
          this.showToast('Please select a PNG image only!', 'error'); // Error message
          return;
        }
        this.showToast('Transparent PNG images work best for coloring!', 'info');
        const imageUrl = URL.createObjectURL(file);
        this.toolService.canvas.clear()
        this.toolService.addImage(imageUrl);
        fileInput.value = '';
      }
    };
    fileInput.click();
  }
  showToast(message: string, type:string) {
    if(type=='success') this.toastService.success(message)
    if(type=='info') this.toastService.info(message)
    if(type=='error') this.toastService.error(message)

    }


  clear(){
    this.toolService.canvas.clear();
  }
}
