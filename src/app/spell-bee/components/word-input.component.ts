import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'word-input',
  template: `
    <form [formGroup]="wordForm" class="word-wrap">
      <input
        *ngFor="let control of limitArray; let i = index"
        class="letter-input"
        [id]="'letter-' + i"
        [formControlName]="'letter-' + i"
        maxlength="1"
        (input)="onInputChange(i)"
        (keydown)="onKeyDown($event, i)"
        (focus)="onFocus(i)"
        [attr.aria-label]="'Letter input ' + (i + 1)"
        placeholder="_"
      />
    </form>
  `,
  styles: [
    `
      .letter-input {
        width: 40px;
        height: 50px;
        margin: 0 5px;
        border: 1px solid #d7d7d7;
        border-radius: 8px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        outline: none;
        transition: all 0.2s ease-in-out;
      }

      .letter-input:focus {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
      }

      .word-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
      }

      .letter-input::selection {
        background: transparent;
      }
    `,
  ],
})
export class WordInputComponent implements OnInit, OnChanges {
  @Input() word : string | undefined  = '';
  @Input() value?: string;
  @Input() isDisabled? = false;
  @Output() wordOut = new EventEmitter<string>();
  limit = 5;
  wordForm!: FormGroup;
  limitArray: number[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['word']) {
      this.resetForm();
    }
    if (changes['isDisabled']) {
      if (this.isDisabled) {
        this.disableAllInputs();  // Disable all form controls
      } else {
        this.enableAllInputs();  // Enable all form controls
      }
    }
  }

  // Initialize form with dynamic number of inputs
  private initializeForm(): void {
    this.wordForm = this.formBuilder.group({});
    this.limitArray = Array.from({ length: this.limit }, (_, i) => i);

    this.limitArray.forEach((index) => {
      this.wordForm.addControl('letter-' + index, new FormControl(''));
    });
  }

  // Reset form when the limit changes
  private resetForm(): void {
    this.limit = this.word?.length || 4;
    this.wordForm = this.formBuilder.group({});
    this.limitArray = Array.from({ length: this.limit }, (_, i) => i);

    this.limitArray.forEach((index) => {
      this.wordForm.addControl('letter-' + index, new FormControl(''));
    });
  }

  // Handle input change, move focus to the next input if filled
  onInputChange(index: number): void {
    const currentValue = this.wordForm.get('letter-' + index)?.value;
    if (currentValue && index < this.limit - 1) {
      const nextElement = document.getElementById('letter-' + (index + 1));
      nextElement?.focus();
    }

    this.emitWordValue();
  }

  // Handle keydown events for navigation and backspace
  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      if (!this.wordForm.get('letter-' + index)?.value) {
        const prevElement = document.getElementById('letter-' + (index - 1));
        prevElement?.focus();
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      const prevElement = document.getElementById('letter-' + (index - 1));
      prevElement?.focus();
    } else if (event.key === 'ArrowRight' && index < this.limit - 1) {
      const nextElement = document.getElementById('letter-' + (index + 1));
      nextElement?.focus();
    }
  }

  // Focus handling
  onFocus(index: number): void {
    const inputElement = document.getElementById('letter-' + index);
    // inputElement?.select();
  }

  // Emit the combined word value when all inputs are filled
  private emitWordValue(): void {
    const word = this.limitArray
      .map((index) => this.wordForm.get('letter-' + index)?.value)
      .join('');

    if (word.length === this.limit) {
      this.wordOut.emit(word);
    }
  }

  // Disable all form controls when isDisabled is true
private disableAllInputs(): void {
  this.limitArray.forEach((index) => {
    const control = this.wordForm.get('letter-' + index);
    if (control) {
      control.disable();
    }
  });
}

// Enable all form controls when isDisabled is false
private enableAllInputs(): void {
  this.limitArray.forEach((index) => {
    const control = this.wordForm.get('letter-' + index);
    if (control) {
      control.enable();
    }
  });
}
}
