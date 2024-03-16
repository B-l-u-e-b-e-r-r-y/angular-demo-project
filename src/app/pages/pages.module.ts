import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedComponentModule } from 'src/app/shared-component/shared-component.module';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedComponentModule,
    FormsModule,
  ],
  declarations: [
    HomePageComponent
  ]
})
export class PagesModule { }
