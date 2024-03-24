import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { DataService } from './services/data.service';
import { PageTitleComponent } from './components/page-title';
import { NavBarComponent } from './components/navbar.component';
import { SocialLinksComponent } from './components/social-links.component';
import { TechBlockComponent } from './components/tech-block';
import { InfoCardComponent } from './components/info-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    PageTitleComponent,
    NavBarComponent,
    SocialLinksComponent,
    TechBlockComponent,
    InfoCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
