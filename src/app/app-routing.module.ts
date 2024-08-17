import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: 'register',
    component: RegisterComponent,
    ...canActivate(() => redirectLoggedInTo(['/home']))
  },
  { path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(['/home']))

  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'search',
    component: SearchComponent,
    ...canActivate(() => redirectUnauthorizedTo([ '/login' ]))
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    ...canActivate(() => redirectUnauthorizedTo([ '/login' ]))
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
