import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TCC } from '../../../model/tcc.model';
import { RelatorioOrientacao } from '../../../model/relatorioOrientacao.model';

@Component({
  selector: 'app-relatoriotcc',
  templateUrl: './relatoriotcc.component.html',
  styleUrls: ['./relatoriotcc.component.scss'],
  animations: [routerTransition()]
})
export class RelatoriotccComponent implements OnInit {
  id: number;
  idRelatorioOrientacao: number;
  tcc: TCC;
  relatorioOrientacao: RelatorioOrientacao;
  formulario: FormGroup = this.construtorFormulario.group({
    idTcc: [],
    id: [],
    orientacao: [],
    dataFormatada: []
  });

  constructor(public router: Router,
    public construtorFormulario: FormBuilder,
    public service: Service,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.idRelatorioOrientacao = this.activatedRoute.snapshot.params.idRelatorioOrientacao;
    if(this.idRelatorioOrientacao != null && this.idRelatorioOrientacao != 0) {
        this.service.Get('relatoriosorientacoes', this.idRelatorioOrientacao)
            .subscribe(
                result => {
                    this.relatorioOrientacao = result;
                    this.formulario.patchValue({
                      id: this.relatorioOrientacao.id,
                      orientacao: this.relatorioOrientacao.orientacao,
                      dataFormatada: this.relatorioOrientacao.data
                    });
                },
                error => {
                    alert(error);
                }
            );
    }
    this.service.Get('tccs', this.id)
        .subscribe(
            result => {
                this.tcc = result;
                this.formulario.patchValue({
                idTcc: this.tcc.id
                });
            },
            error => {
                alert(error);
            }
        );
  }

  onCadastrar() {
    if(this.formulario.value.orientacao == null || this.formulario.value.orientacao == ''
        || this.formulario.value.dataFormatada == null || this.formulario.value.dataFormatada == '') {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 

    this.service.Post<RelatorioOrientacao>('relatoriosorientacoes', this.formulario.value)
        .subscribe(
            result => alert('Atividade cadastrada com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/tcc/relatoriotcc', this.id], { relativeTo: this.activatedRoute })
            },
            () => this.router.navigate(['/tcc/editar', this.id, 2])
        );
  }
}
