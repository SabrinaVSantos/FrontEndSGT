import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoComponent } from './aluno.component';

const routes: Routes = [
    {
        path: '',
        children:
        [
            {path: '', component: AlunoComponent}
           // {path: ':acao', component: CadastroCrudComponent}
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlunoRoutingModule {
}