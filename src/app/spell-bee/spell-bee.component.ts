import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { setPreferences } from './store/actions';
import { Preference } from './models/preference';
import { PreferenceFormDialogComponent } from './components/preference-form-dialog.component';

@Component({
  selector: 'spell-bee',
  template: `
    <div class="spell-bee-container">
      <spell-bee-game *ngIf="isGame"></spell-bee-game>
    </div>
  `,
  styles: [`
    header{
      height: 60px;
      display: flex;
      align-items: center;
    }
    .spell-bee-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      height: 100%;
    }

    .spell-bee-header h1 {
      font-size: 2.5em;
      color: #FF5A5F;
      margin-bottom: 30px;
    }
  `]
})
export class SpellBeeComponent implements OnInit {
  isGame = false;
  preferences: Preference | null = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const questionCount = +params['questionCount'] || 0;
      const timeLimit = +params['timeLimit'] || 0;
      const selectedLevels = params['levels']?.split(',') || [];
      // If any critical parameters are missing, open the dialog
      if (!questionCount || !selectedLevels.length) {
        this.openPreferenceDialog();
      } else {
        this.preferences = {
          questionCount,
          timeLimit,
          selectedLevels,
        };
        this.store.dispatch(setPreferences({ preferences : this.preferences }));
        this.startGame();
      }
    });
  }
  getSpellBeeUrl(preferences: Preference): Record<string, string> {
    const queryParams: Record<string, string> = {};

    if (preferences.questionCount) {
      queryParams['questionCount'] = preferences.questionCount.toString();
    }
    if (preferences.timeLimit) {
      queryParams['timeLimit'] = preferences.timeLimit.toString();
    }
    if (preferences.selectedLevels.length) {
      queryParams['levels'] = preferences.selectedLevels.join(',');
    }

    return queryParams;
  }

  openPreferenceDialog() {
    const dialogRef = this.dialog.open(PreferenceFormDialogComponent, {
      width: '400px',
      disableClose: true,
       panelClass: 'custom-dialog-overlay'
    });

    dialogRef.componentInstance.preferencesSelected.subscribe((preferences: Preference) => {
      this.preferences = preferences;
      const queryParams = this.getSpellBeeUrl(preferences);
      this.navigateTo('spell-bee', queryParams);
      this.startGame();
    });
  }
  navigateTo(path: string, queryParams: Record<string, string> = {}) {
    this.router.navigate([path], { queryParams })
  }

  startGame() {
    this.isGame = true;
    console.log('Game started with preferences:', this.preferences);
  }
}
