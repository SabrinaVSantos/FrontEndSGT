import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastrarComponent } from './cadastrar.component';
import { CadastrarRoutingModule } from './cadastrar-rounting.module';

@NgModule({
  imports: [
    CommonModule,
    CadastrarRoutingModule

  ],
  declarations: [CadastrarComponent]
})
export class CadastrarModule { }
