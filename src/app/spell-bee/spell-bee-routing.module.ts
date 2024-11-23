import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpellBeeComponent } from './spell-bee.component';

const routes: Routes = [
    {
      path: '',
      component: SpellBeeComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpellBeeRoutingModule {}
