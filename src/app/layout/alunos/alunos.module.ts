import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';
import { PageHeaderModule } from './../../shared';
import { CreateComponent } from './create/create.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [CommonModule, AlunosRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule],
    declarations: [AlunosComponent, CreateComponent, EditarComponent,  ListarComponent, VisualizarComponent]
   
})
export class AlunosModule {}