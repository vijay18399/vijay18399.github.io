import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { loadWordsSuccess, loadWords, loadWordFailure } from './actions';
import { SpellBeeState } from './reducers';
import { selectPreferences } from './selectors';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { WordService } from '../../shared/services/word.service';

@Injectable()
export class SpellBeeEffects {

  constructor(
    private actions$: Actions, // Renaming to actions$ for consistency
    private store: Store<SpellBeeState>,
    private wordService: WordService
  ) {}

  // Effect for loading words
  loadWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWords), // When the loadWords action is dispatched
      withLatestFrom(this.store.select(selectPreferences)), // Get preferences from the store
      mergeMap(([action, preferences]) =>
        this.wordService.getCEFRWordsByLevels(preferences).pipe(
          map((data: any) => loadWordsSuccess({ words: data.words })), // Dispatch success action
          catchError((error) => of(loadWordFailure({ error: error.message }))) // Dispatch failure action on error
        )
      )
    )
  );
}
