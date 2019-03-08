import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'alunos', loadChildren: './alunos/alunos.module#AlunosModule' },
            { path: 'professores', loadChildren: './professores/professores.module#ProfessoresModule' },
            { path: 'documentos', loadChildren: './documentos/documentos.module#DocumentosModule' },
            { path: 'tcc', loadChildren: './tcc/tcc.module#TccModule' },
            { path: 'instituicoes', loadChildren: './instituicoes/instituicoes.module#InstituicoesModule' },
            { path: 'preprojeto', loadChildren: './preprojeto/preprojeto.module#PreprojetoModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
