import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config, portfolioData } from '../models/portfolio.model';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private portfolioData!: portfolioData;
  private configData!: Config;
  constructor(private http: HttpClient) {}

  getPortfolioData(): Observable<portfolioData> {
    if (this.portfolioData) {
      return new Observable((observer) => {
        observer.next(this.portfolioData);
        observer.complete();
      });
    } else {
      return this.http.get<portfolioData>('assets/data/portfolio-data.json');
    }
  }
  getConfigData(): Observable<Config> {
    if (this.configData) {
      return new Observable((observer) => {
        observer.next(this.configData);
        observer.complete();
      });
    } else {
      return this.http.get<Config>('assets/data/config.json');
    }
  }
}
