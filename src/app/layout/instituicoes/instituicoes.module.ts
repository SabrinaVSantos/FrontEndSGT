import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InstituicoesRoutingModule } from './instituicoes-routing.module';
import { InstituicoesComponent } from './instituicoes.component';
import { ListarComponent } from './listar/listar.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EditarComponent } from './editar/editar.component';



@NgModule({
    imports: [CommonModule, InstituicoesRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule],
    declarations: [InstituicoesComponent, ListarComponent, CadastrarComponent, EditarComponent]
   
})
export class InstituicoesModule {}