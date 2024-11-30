import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngineComponent } from './game-engine.component';
import { GameEngineRoutingModule } from './game-engine-routing.module';

@NgModule({
  declarations: [GameEngineComponent],
  imports: [CommonModule, GameEngineRoutingModule],
  exports: [GameEngineComponent],
})
export class GameEngineModule {}
