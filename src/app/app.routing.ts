import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { RetratosComponent } from './components/galeria/retratos/retratos.component';
import { ComunidadComponent } from './components/comunidad/comunidad.component';
import { LearningComponent } from './components/learning/learning.component';
import { ViajesComponent } from './components/galeria/viajes/viajes.component';
import { NaturalezaComponent } from './components/galeria/naturaleza/naturaleza.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'retratos',         component: RetratosComponent },
    { path: 'naturaleza',       component: NaturalezaComponent },
    { path: 'viajes',           component: ViajesComponent },
    { path: 'comunidad',      component: ComunidadComponent },
    { path: 'learning',      component: LearningComponent }

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
