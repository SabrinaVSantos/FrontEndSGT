import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Instituicao } from '../../../model/instituicao.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
  animations: [routerTransition()]
})
export class EditarComponent implements OnInit {
    id: number;
    instituicao: Instituicao;
    formulario: FormGroup = this.construtorFormulario.group({
        id: [],
        nome: []
    });

  constructor(public router: Router,
      public construtorFormulario: FormBuilder,
      public service: Service,
      public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    
    this.service.Get('instituicoes', this.id)
        .subscribe(
            result => {
                this.instituicao = result;
                this.formulario.reset({
                    nome: this.instituicao.nome,
                    id: this.instituicao.id
                });
            },
            error => {
                alert(error);
            }
        );
  }

  onCadastrar() {  
    if(this.formulario.value.id == null || this.formulario.value.id == ''
    || this.formulario.value.nome == null || this.formulario.value.nome == ''
    ) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 

    this.service.Post<Instituicao>('instituicoes', this.formulario.value)
        .subscribe(
            result => alert('Instituição ' + result.nome + ' atualizada com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/instituicoes/editar', this.id])
            },
            () => this.router.navigate(['/instituicoes/listar'])
        );
    }
}
