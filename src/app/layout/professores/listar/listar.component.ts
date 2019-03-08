import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { Professor } from '../../../model/professor.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  animations: [routerTransition()]
})
export class ListarComponent implements OnInit {
  professores: Professor[];
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

  deleteProfessor(professor) {
    this.service.Delete('professores', professor.id)
      .subscribe(
          result => {
            alert('Professor removido com sucesso!');
            var index = this.professores.indexOf(professor);
            this.professores.splice(index, 1);
          },
          error => {
              alert(error);
              this.router.navigate(['/professores/listar'])
          }
      );
  }
  
  pesquisar() {
    if(this.formulario.value.nome == null) {
        this.ngOnInit();
    } else {
        let url = 'professores/pesquisa?termo=' + this.formulario.value.nome;
        this.service.Get(url)
            .subscribe(
                result => {
                    this.professores = result;
                },
                error => {
                    alert(error);
                }
            );
        }
    }
}
