import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryComponent } from './dictionary.component';
import { WordDetails } from './components/word-details.component';
import { Search } from './components/search.component';

const routes: Routes = [
   {
     path:'',
     component: DictionaryComponent,
     children:[
      { path: '', component: Search },
      { path: 'word/:word', component: WordDetails },
     ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryRoutingModule {}
