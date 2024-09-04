import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { firebaseConfig } from "./firebase-config";
import { provideRouter } from "@angular/router";
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { LoginComponent } from "./app/components/login/login.component";
import { RegisterComponent } from "./app/components/register/register.component";
import { HomeComponent } from "./app/pages/home/home.component";
import { MovieDetailsComponent } from "./app/pages/movie-details/movie-details.component";
import { SearchComponent } from "./app/pages/search/search.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideHttpClient(),
    provideRouter([
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
    ])
  ]
});
