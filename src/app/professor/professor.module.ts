import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProfessorComponent } from './professor.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfessorRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [ProfessorComponent]
})
export class ProfessorModule { }
