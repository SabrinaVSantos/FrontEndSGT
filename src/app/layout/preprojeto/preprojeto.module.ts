import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { PreprojetoRoutingModule } from './preprojeto-routing.module';
import { PreprojetoComponent } from './preprojeto.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { SubmissaoComponent } from './submissao/submissao.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  imports: [CommonModule, PreprojetoRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule],
    declarations: [PreprojetoComponent, AvaliacaoComponent, EditarComponent, ListarComponent, SubmissaoComponent, UploadComponent ]
})
export class PreprojetoModule { }