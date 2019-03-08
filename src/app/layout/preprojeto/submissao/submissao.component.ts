import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aluno } from '../../../model/aluno.model';
import { Professor } from '../../../model/professor.model';
import { PreProjeto } from '../../../model/preProjeto.model';

@Component({
  selector: 'app-submissao',
  templateUrl: './submissao.component.html',
  styleUrls: ['./submissao.component.scss'],
  animations: [routerTransition()]
})
export class SubmissaoComponent implements OnInit {
  alunos: Aluno[];
  professores: Professor[];
  preProjeto: PreProjeto;
  formulario: FormGroup = this.construtorFormulario.group({
    tema: [],
    idAluno1: [],
    idAluno2: [],
    idAvaliador1:[],
    idAvaliador2:[],
    idOrientador: [],
    idCoOrientador: [],
    nota1:[],
    nota2:[],
    observavao1:[],
    observacao2:[],
    estadoAvaliacao: [],
    anexo: []
  });

  constructor(
    public construtorFormulario: FormBuilder,
    public service: Service,
    public router: Router,
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
        || this.formulario.value.idOrientador == this.formulario.value.idAvaliador1
        || this.formulario.value.idOrientador == this.formulario.value.idAvaliador2) {
        alert('O orientador deve ser diferente dos demais membros da banca.');
        return;
    }
    if(this.formulario.value.idCoOrientador != null 
        && (this.formulario.value.idCoOrientador == this.formulario.value.idAvaliador1
        || this.formulario.value.idCoOrientador == this.formulario.value.idAvaliador2)) {
            alert('O co-orientador deve ser diferente dos demais avaliadores.');
            return;
    }
    if(this.formulario.value.idAvaliador1 != null 
        && this.formulario.value.idAvaliador1 == this.formulario.value.idAvaliador2) {
            alert('Os avaliadores devem ser diferentes entre si.');
            return;
    }

    this.service.Post<PreProjeto>('preprojetos', this.formulario.value)
        .subscribe(
            result => {
                this.preProjeto = result;
                alert('Pré-projeto cadastrado com sucesso!')
            },
            error => {
                alert(error);
                this.router.navigate(['/preprojeto/submissao'], { relativeTo: this.activatedRoute })
            },
            () => this.router.navigate(['/preprojeto/editar', this.preProjeto.id])
        );
  }
}
