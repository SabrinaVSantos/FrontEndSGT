import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { TCC } from '../../../model/tcc.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-acompanhar',
  templateUrl: './acompanhar.component.html',
  styleUrls: ['./acompanhar.component.scss'],
  animations: [routerTransition()]
})
export class AcompanharComponent implements OnInit {
  tccs: TCC[];
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
    this.service.Get('tccs')
        .subscribe(
            result => {
                this.tccs = result;
            },
            error => {
                alert(error);
            }
        );
  }

  deleteTCC(tcc) {
    this.service.Delete('tccs', tcc.id)
      .subscribe(
          result => {
            alert('TCC removido com sucesso!');
            var index = this.tccs.indexOf(tcc);
            this.tccs.splice(index, 1);
          },
          error => {
              alert(error);
              this.router.navigate(['/tccs/acompanhar'])
          }
      );
  }
  
  pesquisar() {
    if(this.formulario.value.tema == null) {
        this.ngOnInit();
    } else {
        let url = 'tccs/pesquisa?termo=' + this.formulario.value.tema + "&campo=" + this.formulario.value.campo;
        this.service.Get(url)
            .subscribe(
                result => {
                    this.tccs = result;
                },
                error => {
                    alert(error);
                }
            );
        }
    }
}
