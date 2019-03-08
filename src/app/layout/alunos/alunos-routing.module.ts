import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { CreateComponent } from './create/create.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

const routes: Routes = [
    {
        path: '',
        component: AlunosComponent,
        children: [
            { path: '', redirectTo: 'alunos', pathMatch: 'prefix' },
            { path: 'create', component: CreateComponent },
            { path: 'editar/:id', component: EditarComponent },
            { path: 'listar', component: ListarComponent },
            { path: 'visualizar', loadChildren: './visualizar/visualizar.module#VisualizarModule' }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),SlimLoadingBarModule], 
    exports: [RouterModule]
})
export class AlunosRoutingModule {
}
