import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { DataResolver } from './services/data.resolver';
const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
    resolve: {
      portfolioData: DataResolver,
    }
  },
  {
    path:'about',
    component:AboutComponent,
    resolve: {
      portfolioData: DataResolver,
    }
  },
  {
    path:'work',
    component:WorkComponent,
    resolve: {
      portfolioData: DataResolver,
    }
  },
  {
    path:'projects',
    component:ProjectsComponent,
    resolve: {
      portfolioData: DataResolver,
    }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**',
    component:HomeComponent,
    resolve: {
      portfolioData: DataResolver,
    }
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
