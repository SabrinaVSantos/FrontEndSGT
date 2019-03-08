import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Service } from '../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aluno } from '../model/aluno.model';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss'],
  animations: [routerTransition()]
})
export class AlunoComponent implements OnInit {
  constructor(public router: Router,
      public construtorFormulario: FormBuilder,
      public service: Service,
      public activatedRoute: ActivatedRoute
  ) { }
  formulario: FormGroup = this.construtorFormulario.group({
      nome: [],
      email: [],
      matricula: [],
      periodo: [],
      senha: [],
      senha2: []
  });

  ngOnInit() {
  }

  onCadastrar() {      
    if(this.formulario.value.nome == null || this.formulario.value.nome == ''
        || this.formulario.value.email == null || this.formulario.value.email == ''
        || this.formulario.value.matricula == null || this.formulario.value.matricula == ''
        || this.formulario.value.periodo == null || this.formulario.value.periodo == ''
        || this.formulario.value.senha == null || this.formulario.value.senha == ''
        || this.formulario.value.senha2 == null || this.formulario.value.senha2 == '') {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 

    if(this.formulario.value.senha != this.formulario.value.senha2) {
        alert('O campo "Repetir Senha" deve ser igual ao campo "Senha".');
        return;
    }
    
  

    this.service.Post<Aluno>('alunos', this.formulario.value)
        .subscribe(
            result => alert('Aluno ' + result.nome + ' cadastrado com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/aluno'], { relativeTo: this.activatedRoute })
            },
            () => this.router.navigate(['/login'], { relativeTo: this.activatedRoute })
        );
    }
}
