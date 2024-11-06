import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'new-task',
    loadChildren: () => import('./new-task/new-task.module').then(m => m.NewTaskPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationPageModule),
    canActivate:[AuthGuard]
  },  {
    path: 'new-location',
    loadChildren: () => import('./new-location/new-location.module').then( m => m.NewLocationPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
