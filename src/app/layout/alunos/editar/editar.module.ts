import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarComponent } from './editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [EditarComponent]
})
export class EditarModule { }
