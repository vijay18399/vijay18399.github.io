import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WordHeaderComponent } from './components/word-header.component';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './dictionary.component';
import { SharedModule } from "../shared/shared.module";
import { WordDetails } from './components/word-details.component';
import { Search } from './components/search.component';
import { HeaderComponent } from '../shared/components/header.component';
import { LoaderComponent } from '../shared/components/loader.component';

@NgModule({
  declarations: [
    DictionaryComponent,
    Search,
    WordDetails,
    WordHeaderComponent,
  ],
  imports: [
    LoaderComponent,
    HeaderComponent,
    SharedModule,
    DictionaryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule
  ],
  providers: [],
})
export class DictionaryModule {}
