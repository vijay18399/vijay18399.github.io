import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameEngineComponent } from './game-engine.component';
const routes: Routes = [
    {
        path: '',
        component: GameEngineComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameEngineRoutingModule { }
