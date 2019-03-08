import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { Aluno } from '../../../model/aluno.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  animations: [routerTransition()]
})
export class ListarComponent implements OnInit {
    alunos: Aluno[];
    formulario: FormGroup = this.construtorFormulario.group({
        nome: []
    });

    constructor(public router: Router,
        public construtorFormulario: FormBuilder,
        public service: Service,
        public activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.formulario.reset();
        this.service.Get('alunos')
            .subscribe(
                result => {
                    this.alunos = result;
                },
                error => {
                    alert(error);
                }
            );
    }

    deleteAluno(aluno) {
        this.service.Delete('alunos', aluno.id)
        .subscribe(
            result => {
                alert('Aluno removido com sucesso!');
                var index = this.alunos.indexOf(aluno);
                this.alunos.splice(index, 1);
            },
            error => {
                alert(error);
                this.router.navigate(['/alunos/listar'])
            }
        );
    }

    pesquisar() {
        if(this.formulario.value.nome == null) {
            this.ngOnInit();
        } else {
            let url = 'alunos/pesquisa?termo=' + this.formulario.value.nome;
            this.service.Get(url)
                .subscribe(
                    result => {
                        this.alunos = result;
                    },
                    error => {
                        alert(error);
                    }
                );
        }
    }
}
