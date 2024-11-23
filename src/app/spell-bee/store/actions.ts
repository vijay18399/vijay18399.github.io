import { createAction, props } from '@ngrx/store'
import { Word } from '../models/word';
import { Preference } from '../models/preference';
export const setPreferences = createAction('[Preference] Load Preference',props<{ preferences: Preference }>());
export const loadWords = createAction('[Words] Load Words');
export const incrementCurrentIndex = createAction('[Words] Increment Current Index');
export const resetWords = createAction('[Words] Reset Words');
export const updatedCurrentWordAsCompleted = createAction('[Words] Update Current Word as Completed');
export const loadWordsSuccess = createAction('[Words] Load Words Success', props<{ words: Word[] }>());
export const loadWordFailure = createAction('[Words] Load Words Failure', props<{ error: string }>());


