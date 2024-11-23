import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool.service';
import { BG_COLORS, STROKE_COLORS } from '../whiteboard.constants';

@Component({
  selector: 'colors',
  template: `
    <div [ngStyle]="{ width: isMobile ? '60px' : '120px' }" class="color-grid">
      <button
        *ngFor="let color of filteredColors"
        class="color-option"
        [style.background]="color"
        [class.selected]="color === activeColor"
        (click)="selectColor(color)"
      >
        <span  [ngStyle]="{ color: isBucketFill ? '#424242' : '#ffffff' }"    *ngIf="color === activeColor" class="checkmark">✔</span>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        margin-right: 10px;
        height: 96%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }
      .color-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        height: max-content;
        padding: 5px;
        align-items: center;
        justify-content: center;
      }
      .color-option {
        position: relative;
        width: 45px;
        height: 24px;
        border-radius: 0% !important;
        border: 4px solid rgba(0, 0, 0, 0.18);
        cursor: pointer;
      }

      .checkmark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
      }
    `,
  ],
})
export class ColorsComponent implements OnInit {
  isMobile: boolean = false;
  activeColor: string = '#000000';
  filteredColors: string[] = [];
  currentTool!: string;
  isBucketFill: boolean = false;
  constructor(public toolService: ToolService) {
    this.toolService.toolProperties$.subscribe((properties) => {
      this.currentTool = properties.tool;
      this.activeColor = properties.tool === 'bucketfill' ? properties.fill : properties.color;
      this.isBucketFill =  properties.tool === 'bucketfill';
      this.filterColorsForTool(properties.tool);
    });
  }

  ngOnInit() {
    this.filterColorsForMobile();
    this.filterColorsForTool(this.currentTool); // Initial filtering
  }

  // Filter colors based on screen size
  filterColorsForMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  // Filter colors based on the current tool
  filterColorsForTool(tool: string) {
    if (tool === 'bucketfill') {
      // Use a limited subset of background colors for bucket fill
      this.filteredColors = this.isMobile
        ? BG_COLORS.slice(0, 30) // Limited palette for mobile
        : BG_COLORS.slice(0, 30); // Larger palette for desktop
    } else {
      // Use a limited subset of stroke colors for other tools
      this.filteredColors = this.isMobile
        ? STROKE_COLORS.slice(0, 30) // Limited palette for mobile
        : STROKE_COLORS.slice(0, 30); // Larger palette for desktop
    }
  }

  // Select a color and update the respective property in ToolService
  selectColor(color: string) {
    if (color === this.activeColor) {
      return; // Exit if the selected color is already active
    }

    // Update the tool's active color
    if (this.currentTool === 'bucketfill') {
      this.toolService.updateFillColor(color); // Update 'fill' for bucket fill
    } else {
      this.toolService.updateColor(color); // Update 'color' for other tools
    }

    // Update the activeColor property for highlighting
    this.activeColor = color;
  }
}
