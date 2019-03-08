import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Professor } from '../../../model/professor.model';
import { Instituicao } from '../../../model/instituicao.model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
  animations: [routerTransition()]
})
export class CadastrarComponent implements OnInit {
    instituicoes: Instituicao[];
    formulario: FormGroup = this.construtorFormulario.group({
      nome: [],
      email: [],
      siape: [],
      lattes: [],
      areaPesquisa: [],
      escolaridade: [],
      nde: false,
      perfil: 'PROFESSOR',
      idInstituicao: [],
      senha: [],
      senha2: []
    });

  constructor(public router: Router,
      public construtorFormulario: FormBuilder,
      public service: Service,
      public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.service.Get('instituicoes')
        .subscribe(
            result => {
                this.instituicoes = result;
            },
            error => {
                alert(error);
            }
        );
  }

  onCadastrar() {   
    if(this.formulario.value.nome == null || this.formulario.value.nome == ''
        || this.formulario.value.email == null || this.formulario.value.email == ''
        || this.formulario.value.siape == null || this.formulario.value.siape == ''
        || this.formulario.value.lattes == null || this.formulario.value.lattes == ''
        || this.formulario.value.areaPesquisa == null || this.formulario.value.areaPesquisa == ''
        || this.formulario.value.escolaridade == null || this.formulario.value.escolaridade == ''
        || this.formulario.value.nde == null
        || this.formulario.value.perfil == null || this.formulario.value.perfil == ''
        || this.formulario.value.idInstituicao == null || this.formulario.value.idInstituicao == ''
        || this.formulario.value.senha == null || this.formulario.value.senha == ''
        || this.formulario.value.senha2 == null || this.formulario.value.senha2 == '') {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 
    if(this.formulario.value.senha != this.formulario.value.senha2) {
        alert('O campo "Repetir Senha" deve ser igual ao campo "Senha".');
        return;
    }


    this.service.Post<Professor>('professores', this.formulario.value)
        .subscribe(
            result => alert('Professor ' + result.nome + ' cadastrado com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/professores/cadastrar'], { relativeTo: this.activatedRoute })
            },
            () => this.router.navigate(['/professores/listar'])
        );
    }
}
