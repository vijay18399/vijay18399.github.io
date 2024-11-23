import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ScoreBoardComponent } from './components/score-board.component';
import { SpellBeeGameComponent } from './components/spell-bee-game.component';
import { SpellBeeWordComponent } from './components/spell-bee-word.component';
import { SpellBeeRoutingModule } from './spell-bee-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from '../shared/shared.module';
import { SpellBeeComponent } from './spell-bee.component';
import { PreferenceFormDialogComponent } from './components/preference-form-dialog.component';
import { WordInputComponent } from './components/word-input.component';
import { HeaderComponent } from '../shared/components/header.component';
import { LoaderComponent } from '../shared/components/loader.component';



@NgModule({
  declarations: [
    SpellBeeComponent,
    PreferenceFormDialogComponent,
    ScoreBoardComponent,
    SpellBeeGameComponent,
    SpellBeeWordComponent,
    WordInputComponent,
  ],

  imports: [
    SharedModule,
    LoaderComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpellBeeRoutingModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  providers:[
    provideAnimationsAsync(),
    provideHotToastConfig()
  ]
})
export class SpellBeeModule { }
