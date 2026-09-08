import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './_layout/anonymous/auth/auth.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { PasswordRecoverComponent } from './auth/pages/password-recover/password-recover.component';
import { PasswordChangeComponent } from './auth/pages/password-change/password-change.component';
import { AuthorizedComponent } from './_layout/authorized/authorized.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from './template/template.component';
import { Error404Component } from './error-pages/error-404/error-404.component';
import { Error500Component } from './error-pages/error-500/error-500.component';
import { TemplateCardsComponent } from './template-cards/template-cards.component';
import { GridsComponent } from './grids/grids.component';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  // Initial redirection on app startup
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // 👈 ¡Este va primero!
  //Login Flow
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SignInComponent },
      { path: 'password-recover', component: PasswordRecoverComponent },
      { path: 'password-change', component: PasswordChangeComponent },
    ],
  },
  //Backoffice Flow
  {
    path: '',
    component: AuthorizedComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'starter-kit/template-components', component: TemplateComponent },
      { path: 'starter-kit/grids', component: GridsComponent },
      { path: 'starter-kit/template-cards', component: TemplateCardsComponent },
      { path: 'starter-kit/dark-mode-demo', component: DarkModeComponent },
      { path: 'help', component: HelpComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  //Error Pages
  { path: 'error-404', component: Error404Component },
  { path: 'error-500', component: Error500Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
