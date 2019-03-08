import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Professor } from '../../../model/professor.model';
import { Instituicao } from '../../../model/instituicao.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
  animations: [routerTransition()]
})
export class EditarComponent implements OnInit {
    id: number;
    professor: Professor;
    instituicoes: Instituicao[];
    formulario: FormGroup = this.construtorFormulario.group({
        id: [],
        nome: [],
        email: [],
        siape: [],
        lattes: [],
        areaPesquisa: [],
        escolaridade: [],
        nde: [],
        perfil: [],
        idInstituicao: [],
        senha: []
    });

  constructor(public router: Router,
      public construtorFormulario: FormBuilder,
      public service: Service,
      public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    
    document.getElementById("loading").style.display = "block";

    this.service.Get('instituicoes')
        .subscribe(
            result => {
                this.instituicoes = result;
            },
            error => {
                alert(error);
            }
        );
    
    this.service.Get('professores', this.id)
        .subscribe(
            result => {
                this.professor = result;
                this.formulario.reset({
                    nome: this.professor.nome,
                    email: this.professor.email,
                    lattes: this.professor.lattes,
                    areaPesquisa: this.professor.areaPesquisa,
                    escolaridade: this.professor.escolaridade,
                    nde: this.professor.nde,
                    perfil: this.professor.perfil,
                    idInstituicao: this.professor.instituicao.id,
                    senha: this.professor.senha,
                    siape: this.professor.siape,
                    id: this.professor.id
                });
            },
            error => {
                alert(error);
            },
            () => {
                document.getElementById("loading").style.display = "none";
            }
        );
  }

  onCadastrar() {    
    if(this.formulario.value.id == null || this.formulario.value.id == ''
        || this.formulario.value.nome == null || this.formulario.value.nome == ''
        || this.formulario.value.email == null || this.formulario.value.email == ''
        || this.formulario.value.siape == null || this.formulario.value.siape == ''
        || this.formulario.value.lattes == null || this.formulario.value.lattes == ''
        || this.formulario.value.areaPesquisa == null || this.formulario.value.areaPesquisa == ''
        || this.formulario.value.escolaridade == null || this.formulario.value.escolaridade == ''
        || this.formulario.value.nde == null
        || this.formulario.value.perfil == null || this.formulario.value.perfil == ''
        || this.formulario.value.idInstituicao == null || this.formulario.value.idInstituicao == ''
        || this.formulario.value.senha == null || this.formulario.value.senha == '') {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 

    this.service.Post<Professor>('professores', this.formulario.value)
        .subscribe(
            result => alert('Professor ' + result.nome + ' atualizado com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/professores/editar', this.id])
            },
            () => this.router.navigate(['/professores/listar'])
        );
    }
}
