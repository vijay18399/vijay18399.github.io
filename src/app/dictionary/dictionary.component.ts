import { Component } from '@angular/core';
@Component({
  selector: 'dictionary',
  template: `
    <tool-header [toolKey]="'Dictionary'" [showBackButton]="true"></tool-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class DictionaryComponent {
  title = 'dictionaryApp';
}
