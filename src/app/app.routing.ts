import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { RetratosComponent } from './components/galeria/retratos/retratos.component';
import { ComunidadComponent } from './components/comunidad/comunidad.component';
import { LearningComponent } from './components/learning/learning.component';
import { ViajesComponent } from './components/galeria/viajes/viajes.component';
import { NaturalezaComponent } from './components/galeria/naturaleza/naturaleza.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './components/guard/auth.guard';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent, canActivate: [ AuthGuard ] },
    { path: 'signup',           component: SignupComponent },
    { path: 'register',         component: RegisterComponent },
    { path: 'retratos',         component: RetratosComponent, canActivate: [ AuthGuard ] },
    { path: 'naturaleza',       component: NaturalezaComponent, canActivate: [ AuthGuard ] },
    { path: 'viajes',           component: ViajesComponent, canActivate: [ AuthGuard ] },
    { path: 'comunidad',      component: ComunidadComponent, canActivate: [ AuthGuard ] },
    { path: 'learning',      component: LearningComponent, canActivate: [ AuthGuard ] }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
