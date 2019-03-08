import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessoresComponent } from './professores.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
    {
        path: '', component: ProfessoresComponent,
        children: [
            { path: '', redirectTo: 'professores', pathMatch: 'prefix' },
            { path: 'cadastrar', component: CadastrarComponent },
            { path: 'editar/:id', component: EditarComponent },
            { path: 'listar', component: ListarComponent },
            

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfessoresRoutingModule {
}
