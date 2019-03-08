import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Instituicao } from '../../../model/instituicao.model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
  animations: [routerTransition()]
})
export class CadastrarComponent implements OnInit {
    formulario: FormGroup = this.construtorFormulario.group({
        nome: []
    });

  constructor(public router: Router,
      public construtorFormulario: FormBuilder,
      public service: Service,
      public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onCadastrar() {  
    if(this.formulario.value.nome == null || this.formulario.value.nome == '') {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 

    this.service.Post<Instituicao>('instituicoes', this.formulario.value)
        .subscribe(
            result => alert('Instituição ' + result.nome + ' cadastrada com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/instituicoes/cadastrar'])
            },
            () => this.router.navigate(['/instituicoes/listar'])
        );
    }
}
