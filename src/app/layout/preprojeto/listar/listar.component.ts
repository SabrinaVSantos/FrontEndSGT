import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { PreProjeto } from '../../../model/preProjeto.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  animations: [routerTransition()]
})
export class ListarComponent implements OnInit {
  preProjetos: PreProjeto[];
  formulario: FormGroup = this.construtorFormulario.group({
      tema: [],
      campo: 'TEMA'
  });

  constructor(public router: Router,
    public construtorFormulario: FormBuilder,
    public service: Service,
    public activatedRoute: ActivatedRoute
) { }

  ngOnInit() {
    this.formulario.reset();
    this.formulario.patchValue({campo: 'TEMA'});
    this.service.Get('preprojetos')
        .subscribe(
            result => {
                this.preProjetos = result;
            },
            error => {
                alert(error);
            }
        );
  }

  deletePreProjeto(preProjeto) {
    this.service.Delete('preprojetos', preProjeto.id)
      .subscribe(
          result => {
            alert('Pré-Projeto removido com sucesso!');
            var index = this.preProjetos.indexOf(preProjeto);
            this.preProjetos.splice(index, 1);
          },
          error => {
              alert(error);
              this.router.navigate(['/preprojeto/listar'])
          }
      );
  }
  
  pesquisar() {
    if(this.formulario.value.tema == null) {
        this.ngOnInit();
    } else {
        let url = 'preprojetos/pesquisa?termo=' + this.formulario.value.tema + "&campo=" + this.formulario.value.campo;
        this.service.Get(url)
            .subscribe(
                result => {
                    this.preProjetos = result;
                },
                error => {
                    alert(error);
                }
            );
        }
    }
}
