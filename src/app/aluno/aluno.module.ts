import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoComponent } from './aluno.component';
import { AlunoRoutingModule } from './aluno-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AlunoRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [AlunoComponent]
})
export class AlunoModule { }
