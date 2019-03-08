import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreprojetoComponent } from './preprojeto.component';

import { SubmissaoComponent } from './submissao/submissao.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { EditarComponent } from './editar/editar.component';
import { UploadComponent } from './upload/upload.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ListarComponent } from './listar/listar.component';


const routes: Routes = [
    {
        path: '',
        component: PreprojetoComponent,
        children: [
            { path: '', redirectTo: 'preprojeto', pathMatch: 'prefix' },
            { path: 'listar',    component: ListarComponent },
            { path: 'submissao', component: SubmissaoComponent },
            { path: 'avaliacao/:id/:idAvaliador/:div', component: AvaliacaoComponent },
            { path: 'editar/:id/:div', component: EditarComponent },
            { path: 'upload/:id',    component: UploadComponent }
   
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes),SlimLoadingBarModule],
    exports: [RouterModule]
})
export class PreprojetoRoutingModule {
}
