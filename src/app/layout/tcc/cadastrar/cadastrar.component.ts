import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aluno } from '../../../model/aluno.model';
import { Professor } from '../../../model/professor.model';
import { TCC } from '../../../model/tcc.model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
  animations: [routerTransition()]
})
export class CadastrarComponent implements OnInit {
  alunos: Aluno[];
  professores: Professor[];
  formulario: FormGroup = this.construtorFormulario.group({
    tema: [],
    idAluno1: [],
    idAluno2: [],
    idOrientador: [],
    idCoOrientador: [],
    idMembroBanca1: [],
    idMembroBanca2: [],
    nota1: [],
    nota2: []
  });

  constructor(public router: Router,
    public construtorFormulario: FormBuilder,
    public service: Service,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.service.Get('alunos')
        .subscribe(
            result => {
                this.alunos = result;
            },
            error => {
                alert(error);
            }
        );
    this.service.Get('professores')
        .subscribe(
            result => {
                this.professores = result;
            },
            error => {
                alert(error);
            }
        );
  }

  onCadastrar() {
    if(this.formulario.value.tema == null || this.formulario.value.tema == ''
        || this.formulario.value.idAluno1 == null || this.formulario.value.idAluno1 == ''
        || this.formulario.value.idOrientador == null || this.formulario.value.idOrientador == '') {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 
    if(this.formulario.value.idAluno1 == this.formulario.value.idAluno2) {
        alert('Os alunos selecionados devem ser diferentes entre si.');
        return;
    }
    if(this.formulario.value.idOrientador == this.formulario.value.idCoOrientador 
        || this.formulario.value.idOrientador == this.formulario.value.idMembroBanca1
        || this.formulario.value.idOrientador == this.formulario.value.idMembroBanca2) {
        alert('O orientador deve ser diferente dos demais membros da banca.');
        return;
    }
    if(this.formulario.value.idCoOrientador != null 
        && (this.formulario.value.idCoOrientador == this.formulario.value.idMembroBanca1
        || this.formulario.value.idCoOrientador == this.formulario.value.idMembroBanca2)) {
            alert('O co-orientador deve ser diferente dos demais membros da banca.');
            return;
    }
    if(this.formulario.value.idMembroBanca1 != null 
        && this.formulario.value.idMembroBanca1 == this.formulario.value.idMembroBanca2) {
            alert('Os membros da banca devem ser diferentes entre si.');
            return;
    }

    this.service.Post<TCC>('tccs', this.formulario.value)
        .subscribe(
            result => alert('TCC ' + result.tema + ' cadastrado com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/tcc/cadastrar'], { relativeTo: this.activatedRoute })
            },
            () => this.router.navigate(['/tcc/acompanhar'])
        );
  }
}
