import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Preference } from '../models/preference';
import { spellBeeConstants } from '../spell-bee.constants';

@Component({
  selector: 'preference-form-dialog',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center" class="dialog-container">
      <form
        [formGroup]="preferenceForm"
        (ngSubmit)="onSubmit()"
        fxLayout="column"
        fxLayoutGap="24px"
        class="form-container"
      >
        <!-- Question Slider -->
        <div fxLayout="column" fxLayoutGap="8px" class="input-field">
          <label for="question-slider" class="slider-label">
            How many words should we test? 📝
          </label>
          <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="15px" class="slider-container">
            <mat-slider
              id="question-slider"
              [min]="questionCountRange.min"
              [max]="questionCountRange.max"
              [step]="1"
            >
              <input formControlName="questionCount" matSliderThumb />
            </mat-slider>
            <span>{{ preferenceForm.get('questionCount')?.value }}</span>
          </div>
        </div>

        <!-- Time Slider -->
        <div fxLayout="column" fxLayoutGap="8px" class="input-field">
          <label for="time-slider" class="slider-label">
            How much time do you have (in min)? ⏳
          </label>
          <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="15px" class="slider-container">
            <mat-slider
              id="time-slider"
              [min]="timeRange.min"
              [max]="timeRange.max"
              [step]="1"
            >
              <input formControlName="timeLimit" matSliderThumb />
            </mat-slider>
            <span>{{ preferenceForm.get('timeLimit')?.value }}</span>
          </div>
        </div>

        <!-- CEFR Levels -->
        <div fxLayout="column" fxLayoutGap="8px" class="input-field">
          <label class="slider-label">
            Choose your level 🎯
          </label>
          <div fxLayout="row" fxLayoutGap="6px" class="card-container">
            <mat-card
              fxLayout="row"
              fxLayoutGap="6px"
              fxLayoutAlign="center center"
              *ngFor="let level of cefrLevels"
              (click)="selectLevel(level)"
              [ngStyle]="getStyle(level)"
              class="category-box"
            >
              {{ level }}
            </mat-card>
          </div>
        </div>

        <button type="submit" mat-flat-button color="primary">Start Playing 🚀</button>
      </form>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 1.5rem 2rem;
        background: white;
      }
      .form-container {
        width: 90%;
      }
      .slider-label {
        font-size: 15px;
        font-weight: bold;
      }
      .slider-container {
            padding: 12px 0px;
      }
      mat-slider {
        width: 100%;
        margin-right: 20px !important;
      }
      .category-box {
        width: 60px;
        height: 30px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s;
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        color: black;
      }
      .category-box:hover {
        transform: scale(1.1);
      }
      button {
        align-self: center;
        padding: 10px 20px;
      }
    `,
  ],
})
export class PreferenceFormDialogComponent {
  @Output() preferencesSelected = new EventEmitter<Preference>();
  cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1'];

  questionCountRange = spellBeeConstants.questionCountRange;
  timeRange = spellBeeConstants.timeRange;

  preferenceForm = new FormGroup({
    questionCount: new FormControl(this.questionCountRange.min),
    timeLimit: new FormControl(this.timeRange.min),
    selectedLevels: new FormControl(['A1']),
  });

  constructor(private dialogRef: MatDialogRef<PreferenceFormDialogComponent>) {}

  getStyle(level: string) {
    const isActive = this.preferenceForm.get('selectedLevels')?.value?.includes(level);
    return {
      color: isActive ? 'white' : 'black',
      background: isActive ? spellBeeConstants.levelBackgrounds[level] : 'white',
      border:  '1px solid #ccc',
    };
  }

  selectLevel(level: string) {
    this.preferenceForm.get('selectedLevels')?.setValue([level]);
  }

  onSubmit() {
    const formValue = this.preferenceForm.value;
    const preferences: Preference = {
      questionCount: formValue.questionCount ?? this.questionCountRange.min,
      timeLimit: formValue.timeLimit ?? this.timeRange.min,
      selectedLevels: formValue.selectedLevels ?? this.cefrLevels,
    };
    this.preferencesSelected.emit(preferences);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
