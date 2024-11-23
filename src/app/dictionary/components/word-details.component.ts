import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordService } from '../../shared/services/word.service';

@Component({
  selector: 'word-details',
  template: `
    <div class="word-page-container" fxLayout="row" fxLayoutAlign="center">
      <loader fxLayout="row" fxLayoutAlign="center"  *ngIf="!wordDetails"></loader>
      <mat-card class="word-page-card" *ngIf="wordDetails" fxLayout="column" fxLayoutGap="16px">
        <!-- Word Header -->
        <word-header
          [wordDetails]="wordDetails"
        ></word-header>

        <!-- Definitions Section -->
        <div class="definitions-container" fxLayout="column" fxLayoutGap="12px">
          <div class="definitions-title">
            Definition<ng-container *ngIf="wordDetails.pos.length > 1">s</ng-container>
          </div>
          <div class="definitions" *ngFor="let partsOfSpeech of wordDetails.pos" fxLayout="column" fxLayoutGap="8px">
          <div   fxLayout="row"  fxLayoutGap="20px">
          <span

              *ngFor="let p of partsOfSpeech.pos.split(',')"
              class="chip"
              [ngStyle]="getPartOfSpeechColor(p)"
            >
              {{ p }}
            </span>
          </div>

            <p class="definition-item">{{ partsOfSpeech.definition }}</p>
          </div>
        </div>

        <!-- Examples Section -->
        <div
          class="examples-section"
          *ngIf="wordDetails.examples?.length > 0"
          fxLayout="column"
          fxLayoutGap="10px"
        >
          <h2 class="examples-title">Examples</h2>
          <ul class="examples-list">
            <li *ngFor="let example of wordDetails.examples">{{ example }}</li>
          </ul>
        </div>
      </mat-card>
    </div>
  `,
  styles: [
    `
      :host{
        background-image: url('/images/utils/stacked-steps-haikei.svg');
        width: 100%;
        height: calc(100% - 60px);
        display: flex;
        justify-content: center;
      }
      .word-page-container{
        width: 100%;
        height: 100%;
      }
      .word-page-card {
        width: 600px;
        background-color: #fff;
        text-align: left;
        padding: 30px;
        margin: 10px;
        overflow-y: auto;
      }

      .definitions-title, .examples-title {
        font-weight: 600;
        margin: 12px 0px;
      }

      .definitions {
        padding: 12px 16px;
        border: 1px solid #e9ecef;
        border-radius: 8px;
      }

      .chip {
        font-size: 12px;
        font-weight: bold;
        color: #495057;
        padding: 6px 8px;
        border-radius: 6px;
        max-width: max-content;
      }

      .definition-item {
        font-size: 1rem;
        line-height: 1.6;
        color: #343a40;
      }

      .view-word-btn {
        margin: 16px auto;
      }

      .examples-list {
        list-style-type: disc;
        margin-left: 20px;
      }

      .examples-list li {
        margin-bottom: 10px;
      }

      @media (max-width: 600px) {
        .word-page-card {
          width: 100%;
        }
      }
    `,
  ],
})
export class WordDetails implements OnInit {
  @Input() wordDetails: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wordService: WordService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const word = params['word'];
      if (word) {
        this.wordService.getWordDetails(word).subscribe((data) => {
          this.wordDetails = data;
        });
      }
    });
  }

  practiceWord(word: string) {
    this.router.navigate(['/practice', word]);
  }

  getPartOfSpeechColor(partOfSpeech: string) {
    const colorMap: any = {
      noun: { background: '#E8F5E9', color: '#1B5E20' },
      verb: { background: '#E8EAF6', color: '#1A237E' },
      adjective: { background: '#FFEBEE', color: '#B71C1C' },
      adverb: { background: '#F3E5F5', color: '#ba68c8' },
      other: { background: '#FFF3E0', color: '#E65100' },
    };
    return colorMap[partOfSpeech.toLowerCase()] || colorMap['other'];
  }

  viewWord() {
    this.router.navigate(['dictionary/word', this.wordDetails.word]);
  }
}
