import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { Instituicao } from '../../../model/instituicao.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  animations: [routerTransition()]
})
export class ListarComponent implements OnInit {
    instituicoes: Instituicao[];
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

    deleteInstituicao(instituicao) {
        this.service.Delete('instituicoes', instituicao.id)
        .subscribe(
            result => {
                alert('Instituição removida com sucesso!');
                var index = this.instituicoes.indexOf(instituicao);
                this.instituicoes.splice(index, 1);
            },
            error => {
                alert(error);
                this.router.navigate(['/instituicoes/listar'])
            }
        );
    }

    pesquisar() {
        if(this.formulario.value.nome == null) {
            this.ngOnInit();
        } else {
            let url = 'instituicoes/pesquisa?termo=' + this.formulario.value.nome;
            this.service.Get(url)
                .subscribe(
                    result => {
                        this.instituicoes = result;
                    },
                    error => {
                        alert(error);
                    }
                );
        }
    }
}
