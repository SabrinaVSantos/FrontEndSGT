import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessoresRoutingModule } from './professores-routing.module';
import { ProfessoresComponent } from './professores.component';
import { PageHeaderModule } from './../../shared';
import { ListarComponent } from './listar/listar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EditarComponent } from './editar/editar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonModule, ProfessoresRoutingModule, PageHeaderModule,FormsModule, ReactiveFormsModule],
    declarations: [ProfessoresComponent, ListarComponent, CadastrarComponent, EditarComponent]
})
export class ProfessoresModule {}