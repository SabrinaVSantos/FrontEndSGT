import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TccRoutingModule } from './tcc-routing.module';
import { TccComponent } from './tcc.component';
import { PageHeaderModule } from './../../shared';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { AcompanharComponent } from './acompanhar/acompanhar.component';
import { RelatoriotccComponent } from './relatoriotcc/relatoriotcc.component';
import { EditarComponent } from './editar/editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformesmatriculaComponent } from './informesmatricula/informesmatricula.component';


@NgModule({
    imports: [CommonModule, TccRoutingModule, PageHeaderModule,FormsModule, ReactiveFormsModule],
    declarations: [TccComponent, AcompanharComponent, CadastrarComponent, RelatoriotccComponent, 
        EditarComponent, InformesmatriculaComponent]
})
export class TccModule {}