import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home-module').then(m => m.HomeModule) 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/auth/login/login-module').then(m => m.LoginModule) 
  },
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios-module').then(m => m.UsuariosModule) }
];

// ng generate module pages/auth/login -m=app --route login

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
