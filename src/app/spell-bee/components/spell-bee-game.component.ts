import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  selectError,
  selectPreferences,
  selectWords,
  selectCurrentWord,
  selectCurrentIndex,
} from '../store/selectors';
import {
  loadWords,
  resetWords,
  incrementCurrentIndex,
  updatedCurrentWordAsCompleted,
} from '../store/actions';
import { Router } from '@angular/router';
import { spellBeeConstants } from '../spell-bee.constants';
import { Preference } from '../models/preference';
import { Word } from '../models/word';

@Component({
  selector: 'spell-bee-game',
  template: `
<tool-header
  toolKey="spellBee"
  [showBackButton]="true"
  [backRoute]="'/dashboard'"
></tool-header>
<div fxLayout="column" fxLayoutAlign="center center" class="container" [ngStyle]="getStyle">
      <!-- Error Container -->
      <div *ngIf="(error$ | async) as error" fxLayout="row" fxLayoutAlign="center center" class="error-container">
        <mat-card class="error-card" fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
          <mat-icon>error</mat-icon>
          <span>Unable to Load Spell Bee, Please try Later</span>
        </mat-card>
      </div>

      <!-- Game Container -->
      <mat-card *ngIf="!loading && !(error$ | async)" fxLayout="column" fxLayoutAlign="center center" class="game-container">
        <!-- Score and Timer Panel -->
        <div *ngIf="!gameEnded" fxLayout="row" fxLayoutAlign="space-between center" class="score-timer-panel">
          <div>
            <span class="question-tracker">Question: {{ questionNumber | async }}/{{ totalQuestions }}</span>
          </div>
          <div fxLayout="row" fxLayoutAlign="space-between center" class="timer" fxLayoutGap="4px">
            <mat-icon>timer</mat-icon>
            {{ formattedTime }}
          </div>
        </div>

        <!-- Word Component -->
        <spell-bee-word
          fxLayout="column" fxLayoutAlign="space-between end"
          *ngIf="!gameEnded"
          (onSuccess)="handleSuccess()"
          (onSkip)="advanceWord()"
          (onNext)="advanceWord()"
        >
        </spell-bee-word>

        <!-- Scoreboard -->
        <score-board
          *ngIf="gameEnded"
          [score]="score"
          [totalWords]="totalQuestions"
          [feedbackMessage]="getFeedbackMessage()"
          [words]="words"
          (newGame)="startNewGame()"
          (goHome)="navigateHome()"
        >
        </score-board>
      </mat-card>

      <!-- Loader -->
      <loader *ngIf="loading && !(error$ | async)"></loader>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }

      .container {
        width: 100%;
        // height: 100%;
      }

      .error-container {
        width: 100%;
        margin: 1rem 0;
      }

      .error-card {
        padding: 1rem;
        background-color: #ffebee;
        color: #b71c1c;
        border: 1px solid #b71c1c;
        border-radius: 8px;
        font-size: 1rem;
        margin: 0 20px;
      }
      .score-timer-panel{
        width : 100%;
      }

      .game-container {
        max-width: 95%;
        width: 640px;
        margin: 12px;
        background: white;
        padding: 1rem;
        border-radius: 15px;
      }

      .timer {
        color: #583707;
        background: #ffb74d;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 14px;
        width : 90px;
      }

      .question-tracker {
        font-size: 0.9rem;
        font-weight: 500;
        color: #333;
      }
    `,
  ],
})
export class SpellBeeGameComponent implements OnInit, OnDestroy {
  @Input() preferences!: Preference;
  words: Word[] = [];
  error$!: Observable<string>;
  currentIndex$!: Observable<number>;
  loading = false;
  gameEnded = false;
  score = 0;
  timeLeft = 0;
  timerInterval!: any;
  totalQuestions = 0;
  preferences$!: Observable<Preference>;
  selectWordsSubscription!: Subscription;
  preferencesSubscription!: Subscription;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.initializeGame();
  }

  get getStyle() {
    const background = spellBeeConstants.levelBackgrounds[this.preferences?.selectedLevels?.[0]];
    return { background, width: '100%', height: 'calc( 100% - 55px)' };
  }

  private initializeGame() {
    this.store.dispatch(loadWords());
    this.loading = true;
    this.gameEnded = false;
    this.score = 0;
    this.preferencesSubscription = this.store.pipe(select(selectPreferences)).subscribe((preferences) => {
      this.preferences = preferences;
    });
    this.selectWordsSubscription = this.store.pipe(select(selectWords)).subscribe((words) => {
      if (words.length > 0) {
        this.words = words;
        this.totalQuestions = words.length;
        this.loading = false;
        if (!this.timerInterval) {
          this.startTimer();
        }
      }
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  handleSuccess() {
    this.score++;
    this.store.dispatch(updatedCurrentWordAsCompleted());
    this.checkAndEndGame(true);
  }

  advanceWord() {
    this.store.dispatch(incrementCurrentIndex());
    this.checkAndEndGame(false);
  }

  private checkAndEndGame(fromSuccess: boolean) {
    this.store
      .pipe(select(selectCurrentIndex))
      .subscribe((currentIndex) => {
        if (currentIndex + 1 === this.words.length && fromSuccess) {
          this.endGame();
        }
        if (currentIndex == this.words.length && !fromSuccess) {
          this.endGame();
        }
      })
      .unsubscribe();
  }

  private startTimer() {
    this.timeLeft = this.preferences?.timeLimit ? this.preferences.timeLimit * 60 : 300; // Default 5 mins
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.endGame();
      }
    }, 1000);
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  get questionNumber(): Observable<number> {
    return this.store.pipe(select(selectCurrentIndex), map((index) => index + 1));
  }

  private endGame() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.gameEnded = true;
    this.selectWordsSubscription.unsubscribe();
    this.preferencesSubscription.unsubscribe();
    this.store.dispatch(resetWords());
  }

  startNewGame() {
    this.initializeGame();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  getFeedbackMessage(): string {
    const percentage = (this.score / this.totalQuestions) * 100;
    return percentage >= 70
      ? 'You did great!'
      : percentage >= 50
      ? 'Well done!'
      : 'Keep practicing!';
  }
}
