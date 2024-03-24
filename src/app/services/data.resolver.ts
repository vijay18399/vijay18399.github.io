import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataResolver implements Resolve<any> {
  constructor(private dataService: DataService) {}

  resolve(): Observable<any> {
    return this.dataService.getPortfolioData();
  }
}
