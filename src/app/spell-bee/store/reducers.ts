import { createReducer, on } from '@ngrx/store';
import { setPreferences, loadWordsSuccess, loadWordFailure, resetWords, incrementCurrentIndex, updatedCurrentWordAsCompleted } from './actions';
import { Preference } from '../models/preference';
import { Word } from '../models/word';

export interface SpellBeeState {
  preferences: Preference;
  currentIndex: number;
  words: Word[];
  error: string;
}

export const initialState: SpellBeeState = {
  preferences: {
    questionCount: 4,
    timeLimit: 5,
    selectedLevels: [],
  },
  currentIndex: 0,
  words: [],
  error: '',
};

export const spellBeeReducer = createReducer(
  initialState,
  on(setPreferences, (state, { preferences }) => ({ ...state, preferences })),
  on(loadWordsSuccess, (state, { words }) => ({ ...state, words, currentIndex: 0 })),
  on(resetWords, state => ({ ...state, words: [] })),
  on(incrementCurrentIndex, state => {
    return { ...state, currentIndex :state.currentIndex + 1 };
  }),
  on(updatedCurrentWordAsCompleted, state => {
    const updatedWords = state.words.map((word, wordIndex) =>
      wordIndex === state.currentIndex ? { completed: true, ...word } : word
    );
    return { ...state, words: updatedWords };
  }),
  on(loadWordFailure, (state, { error }) => ({ ...state, error })),
);
