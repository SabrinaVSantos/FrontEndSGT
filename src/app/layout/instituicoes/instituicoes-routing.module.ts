import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituicoesComponent } from './instituicoes.component';
import { ListarComponent } from './listar/listar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EditarComponent } from './editar/editar.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

const routes: Routes = [
    {
        path: '',
        component: InstituicoesComponent,
        children: [
            { path: '', redirectTo: 'instituições', pathMatch: 'prefix' },
            { path: 'cadastrar', component: CadastrarComponent },
            { path: 'editar/:id', component: EditarComponent },
            { path: 'listar', component: ListarComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),SlimLoadingBarModule], 
    exports: [RouterModule]
})
export class InstituicoesRoutingModule {
}
