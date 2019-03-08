import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aluno } from '../../../model/aluno.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
  animations: [routerTransition()]
})
export class EditarComponent implements OnInit {
    id: number;
    aluno: Aluno;
    formulario: FormGroup = this.construtorFormulario.group({
        id: [],
        nome: [],
        email: [],
        matricula: [],
        periodo: [],
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

    this.service.Get('alunos', this.id)
        .subscribe(
            result => {
                this.aluno = result;
                this.formulario.reset({
                    nome: this.aluno.nome,
                    email: this.aluno.email,
                    periodo: this.aluno.periodo,
                    senha: this.aluno.senha,
                    matricula: this.aluno.matricula,
                    id: this.aluno.id
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
    || this.formulario.value.matricula == null || this.formulario.value.matricula == ''
    || this.formulario.value.periodo == null || this.formulario.value.periodo == ''
    || this.formulario.value.senha == null || this.formulario.value.senha == ''
    ) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 

    this.service.Post<Aluno>('alunos', this.formulario.value)
        .subscribe(
            result => alert('Aluno ' + result.nome + ' atualizado com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/alunos/editar', this.id])
            },
            () => this.router.navigate(['/alunos/listar'])
        );
    }
}
