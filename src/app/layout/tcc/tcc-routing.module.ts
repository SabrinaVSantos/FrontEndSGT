import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TccComponent } from './tcc.component';
import { AcompanharComponent } from './acompanhar/acompanhar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { RelatoriotccComponent } from './relatoriotcc/relatoriotcc.component';
import { EditarComponent } from './editar/editar.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { InformesmatriculaComponent } from './informesmatricula/informesmatricula.component';


const routes: Routes = [
    {
        path: '', component: TccComponent,
        children: [
            { path: '', redirectTo: 'tcc', pathMatch: 'prefix' },
            { path: 'acompanhar', component: AcompanharComponent },
            { path: 'cadastrar', component: CadastrarComponent },
            { path: 'relatoriotcc/:id/:idRelatorioOrientacao', component: RelatoriotccComponent },
            { path: 'editar/:id/:div', component:EditarComponent },
            { path: 'informesmatricula', component: InformesmatriculaComponent }
         
   
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes),SlimLoadingBarModule],
    exports: [RouterModule]
})
export class TccRoutingModule {
}
