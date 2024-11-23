import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WordService } from '../../shared/services/word.service';

@Component({
  selector: 'search',
  template: `
    <div class="container">
      <!-- Header Section -->
      <header class="header">
        <p class="header-subtitle">Expand your vocabulary with ease</p>
      </header>

      <!-- Word Search Section -->
      <section class="search-section mat-elevation-z4">
        <mat-form-field class="search-field" appearance="outline">
          <mat-label>Search for a word</mat-label>
          <input
            matInput
            [formControl]="wordControl"
            placeholder="Type a word..."
            (keydown.enter)="onEnter()"
          />
          <button mat-icon-button matSuffix (click)="onEnter()">
            <mat-icon>search</mat-icon>
          </button>
        </mat-form-field>

        <h6 *ngIf="lastSearches.length > 0  && !wordControl.value?.length"  class="title">Last Searches</h6>

        <!-- Last Searches Section -->
        <mat-chip-set *ngIf="lastSearches.length > 0  && !wordControl.value?.length" class="last-searches">
          <mat-chip
            *ngFor="let word of lastSearches"
            (click)="navigateToWord(word)"
            matTooltip="Search '{{ word }}'"
            class="search-chip"
          >
            {{ word }}
          </mat-chip>
        </mat-chip-set>

        <!-- Recommendations Section -->
        <mat-list *ngIf="recommendations.length > 0" class="recommendations">
          <mat-list-item
            *ngFor="let word of recommendations"
            (click)="onWordClick(word)"
          >
            <span [innerHTML]="highlightMatch(word, wordControl.value)"></span>
          </mat-list-item>
        </mat-list>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        height: calc(100% - 60px);
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background-image: url('/images/utils/stacked-steps-haikei.svg');
        // background-repeat: no-repeat;
        // background-size: cover;
        // background-position: center;
        gap: 10px;
        color: white;
        height: 100%;
      }

      /* Header Section */
      .header {
        text-align: center;
        margin-bottom: 10px;
      }
      .header-subtitle {
        font-size: 1.2rem;
      }
      .title{
        color:black;
        font-size: 1rem;

      }
      /* Search Section */
      .search-section {
        width: 100%;
        max-width: 500px;
        padding: 20px;
        background: white;
        border-radius: 8px;
        position: relative;
      }

      .search-field {
        width: 100%;
      }

      .recommendations {
        margin-top: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background: #ffffff;
        max-height: 300px;
        overflow-y: auto;
        position: absolute;
        width: 93%;
        left: 19px;
        top: 70px;
      }

      mat-list-item {
        padding: 8px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      mat-list-item:hover {
        background-color: #e3f2fd;
      }

      /* Last Searches */
      .last-searches {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .search-chip {
        background-color: #e3f2fd;
        color: #0d47a1;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .search-chip:hover {
        background-color: #bbdefb;
      }
    `,
  ],
})
export class Search implements OnInit {
  wordControl = new FormControl();
  recommendations: string[] = [];
  lastSearches: string[] = [];
  currentDate: Date = new Date();

  constructor(
    private wordService: WordService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load last searches from localStorage
    const storedSearches = localStorage.getItem('lastSearches');
    if (storedSearches) {
      this.lastSearches = JSON.parse(storedSearches);
    }

    // Subscribe to word input changes
    this.wordControl.valueChanges.subscribe((value) => {
      if (value) {
        this.wordService.getRecommendations(value).subscribe((data) => {
          this.recommendations = data.slice(0, 10); // Limit to 5 suggestions
        });
      } else {
        this.recommendations = [];
      }
    });
  }

  onEnter() {
    const word = this.wordControl.value;
    if (word) {
      this.addLastSearch(word); // Add to last searches
      this.router.navigate(['word', word]);
      this.clearRecommendations();
    }
  }

  onWordClick(word: string) {
    this.addLastSearch(word); // Add to last searches
    this.router.navigate(['/dictionary/word', word]);
    this.clearRecommendations();
  }

  highlightMatch(word: string, searchTerm: string): string {
    if (!searchTerm) return word;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return word.replace(regex, '<span class="highlight">$1</span>');
  }

  clearRecommendations() {
    this.recommendations = [];
    this.wordControl.reset();
  }

  navigateToWord(word: string) {
    this.addLastSearch(word); // Add to last searches
    this.router.navigate(['/dictionary/word', word]);
  }

  addLastSearch(word: string) {
    if (!this.lastSearches.includes(word)) {
      if (this.lastSearches.length === 5) {
        this.lastSearches.pop(); // Remove the oldest search if limit is reached
      }
      this.lastSearches.unshift(word); // Add the new search to the start
      localStorage.setItem('lastSearches', JSON.stringify(this.lastSearches)); // Save to localStorage
    }
  }
}
