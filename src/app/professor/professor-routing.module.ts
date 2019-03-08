import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessorComponent } from './professor.component';

const routes: Routes = [
    {
        path: '',
        children:
        [
            {path: '', component: ProfessorComponent}
           // {path: ':acao', component: CadastroCrudComponent}
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfessorRoutingModule {
}