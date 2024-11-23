import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, Renderer2, OnDestroy, inject, ViewChild } from '@angular/core';
import { Word } from '../models/word';
import confetti from 'canvas-confetti';
import { HotToastService } from '@ngxpert/hot-toast';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectCurrentWord } from '../store/selectors';

@Component({
  selector: 'spell-bee-word',
  template: `
    <div fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" class="word-container">
      <!-- Audio Control -->
      <div fxLayout="row" fxLayoutAlign="center center" class="audio-control">
        <button mat-stroked-button (click)="playVoice()">
          <mat-icon>volume_up</mat-icon>
          Listen to the word
        </button>
      </div>

      <!-- Word Input Form -->
      <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="20px" class="form">

        <word-input
            [word]="word?.word"
            [isDisabled]="word?.completed"
            typeOfInput="text"
            (wordOut)="onInputChange($event)"
          ></word-input>
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px" class="submit-button">
          <button *ngIf="!word?.completed" mat-raised-button (click)="onSubmit()">Submit</button>
          <button *ngIf="word?.completed" mat-raised-button (click)="onNextWord()">Next Word</button>
        </div>
      </div>
    </div>

    <!-- Skip Button -->
    <button class="skip" [ngStyle]="{ visibility :  word?.completed  ? 'hidden' : 'visible' }" mat-stroked-button color="warn" (click)="onSkipWord()">
      Skip
    </button>
  `,
  styles: [
    `
      :host {
        margin: 20px 0;
        width: 100%;
      }

      .word-container {
        background: #ffffff;
        padding: 1rem;
        border-radius: 10px;
        width: 100%;
      }

      .audio-control button {
        color: #01579e;
      }

      .skip {
        background-color: #ffffff;
      }

      .form button {
        color: #ffffff;
        background-color: #01579e;
      }

      .completed img {
        width: 28px;
        height: 28px;
      }

      .completed span {
        color: #3eb655;
        font-weight: 600;
      }
    `,
  ],
})
export class SpellBeeWordComponent implements OnInit, OnDestroy {
  @ViewChildren('letterInput') letterInputs!: QueryList<ElementRef>;

  currentWord$ = this.store.pipe(select(selectCurrentWord));

  @Output() onSuccess = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();
  @Output() onSkip = new EventEmitter<void>();

  word!: Word | null;
  wordSubscription!: Subscription;
  audio!: HTMLAudioElement;
  userInput: string = '';
  showOtpInput: boolean = true;
  private toastService = inject(HotToastService);
  currentWordsubscription$!: Subscription;
  get config(){
   return  { length: this.word?.word.length || 0 }
  };

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentWordsubscription$ = this.currentWord$.subscribe((word: Word) => {
      if (word) {
        this.word = word;
        this.audio = new Audio(this.word.voice);
      }
    });
  }

  onNextWord() {
    this.onNext.emit();
  }

  onSkipWord() {
    this.onSkip.emit();
  }

  onInputChange(userInput: string) {
    this.userInput = userInput;
  }

  onSubmit() {
    if (this.word && this.userInput.toLowerCase() === this.word.word.toLowerCase()) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      this.toastService.success("You spelled it right!");

      this.onSuccess.emit();
    } else {
      const isFullyFilled = this.userInput.length === (this.word?.word.length || 0);
      const message = isFullyFilled
        ? 'The spelling appears to be incorrect. Please review and try again.'
        : 'Please complete the word before submitting.';
      this.toastService.error(message);
    }
  }

  playVoice() {
    this.audio.play().catch((err) => {
      console.error('Error playing audio:', err);
    });
  }

  ngOnDestroy() {
    this.currentWordsubscription$.unsubscribe();
  }
}
