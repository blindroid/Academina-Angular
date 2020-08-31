import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { RegisterComponent } from './register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'app/app.routing';



@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [
    CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule
  ],
  providers: [FormsModule, ReactiveFormsModule],
  bootstrap: [RegisterComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RegisterModule { }
