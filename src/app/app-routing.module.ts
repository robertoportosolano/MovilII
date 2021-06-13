import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {  AdminGuard} from "src/app/core/admin.guard";
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./recover/recover.module').then( m => m.RecoverPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'event-create',
    loadChildren: () => import('./pages/event-create/event-create.module').then( m => m.EventCreatePageModule),canActivate: [AdminGuard]
  },
  {
    path: 'event-detail/:id',
    loadChildren: () => import('./pages/event-detail/event-detail.module').then( m => m.EventDetailPageModule),canActivate: [AdminGuard]
  },
  {
    path: 'event-list',
    loadChildren: () => import('./pages/event-list/event-list.module').then( m => m.EventListPageModule),canActivate: [AdminGuard]
  },
  {
    path: 'event-home',
    loadChildren: () => import('./event-home/event-home.module').then( m => m.EventHomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
