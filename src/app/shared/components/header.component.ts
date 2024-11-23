import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { TOOL_METADATA } from '../constants/tool-header.constants';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'tool-header',
  standalone:true,
  imports:[MatIcon, MatButton,FlexLayoutModule, CommonModule],
  template: `
    <header
      [ngStyle]="{ backgroundColor: toolBarColor }"
      fxLayout="row"
      fxLayoutAlign="start center"
      class="header"
    >
      <!-- Back Button -->
      <button
        *ngIf="showBackButton"
        mat-icon-button
        class="back-button"
        (click)="handleBackNavigation()"
      >
        <mat-icon>arrow_back</mat-icon>
      </button>

      <!-- Tool Info -->
      <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
        <img [src]="toolLogo" alt="{{ toolTitle }} Logo" class="logo" />
        <span class="title">{{ toolTitle }}</span>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        width: 100%;
        height: 55px;
        padding: 0 20px;
        background-color: #fbeeac;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .back-button {
        border: none;
        background: none;
        cursor: pointer;
        color: #333;
        margin-right: 15px;
      }

      .back-button mat-icon {
        font-size: 24px;
      }

      .logo {
        width: 40px;
        height: 40px;
      }

      .title {
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() toolKey: string = 'spellBee'; // Default tool key
  @Input() showBackButton: boolean = false; // Toggle the back button
  @Input() backRoute: string | null = null; // Optional route for back navigation
  @Input() onGoBack: (() => void) | null = null; // Optional custom back function

  toolTitle: string = '';
  toolLogo: string = '';
  toolBarColor: any = '';

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    const toolMetadata = TOOL_METADATA[this.toolKey];
    if (toolMetadata) {
      this.toolTitle = toolMetadata.title;
      this.toolLogo = toolMetadata.logo;
      this.toolBarColor = toolMetadata.toolBarColor;
    } else {
      console.warn(`No metadata found for toolKey: ${this.toolKey}`);
      this.toolTitle = 'Tool';
      this.toolLogo = 'images/default.png'; // Default image fallback
    }
  }

  handleBackNavigation() {
    if (this.onGoBack) {
      // If a custom back function is provided, execute it
      this.onGoBack();
    } else if (this.backRoute) {
      // Navigate to the provided route
      this.router.navigate([this.backRoute]);
    } else {
      // Fallback to the previous page in browser history
      this.location.back();
    }
  }
}
