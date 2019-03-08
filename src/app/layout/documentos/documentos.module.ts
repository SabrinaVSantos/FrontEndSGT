import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentosComponent } from './documentos.component';
import { PageHeaderModule } from './../../shared';
import { GerarDocumentosComponent } from './gerar-documentos/gerar-documentos.component';
import { CartaaceiteComponent } from './gerar-documentos/modulos/cartaaceite/cartaaceite.component';
import { AtadefesaComponent } from './gerar-documentos/modulos/atadefesa/atadefesa.component';

@NgModule({
    imports: [CommonModule, DocumentosRoutingModule, PageHeaderModule],
    declarations: [DocumentosComponent,  GerarDocumentosComponent, CartaaceiteComponent, AtadefesaComponent]
})
export class DocumentosModule {}