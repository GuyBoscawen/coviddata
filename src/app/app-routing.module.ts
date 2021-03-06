import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContentsComponent } from './contents/contents.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component'

import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard'


const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'contents',
        component: NavBarComponent,
        canActivate: [ AuthGuardGuard ],
        canActivateChild: [ AuthGuardGuard ],
        children: [
            {
              path: '',
              component: ContentsComponent,
            },
        ]

    },
    {
        path: 'login',
        component: NavBarComponent,
        children: [
            {
              path: '',
              loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
            },
        ]
    },
    {
        path: 'easter_egg',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class AppRoutingModule { }
