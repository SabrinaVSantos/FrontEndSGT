import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreProjeto } from '../../../model/preProjeto.model';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss'],
  animations: [routerTransition()]
})
export class AvaliacaoComponent implements OnInit {
  id: number;
  idAvaliador: number;
  div: string;
  avaliador1: boolean;
  avaliador2: boolean;
  preProjeto: PreProjeto;
  formulario: FormGroup = this.construtorFormulario.group({
    id: [],
    tema: [],
    idAluno1: [],
    idAluno2: [],
    idAvaliador1:[],
    idAvaliador2:[],
    idOrientador:[],
    idCoOrientador:[],
    nota1:[],
    nota2:[],
    observacao1:[],
    observacao2:[],
    aprovado:[],
    observacaoAprovacao:[],
    estadoAvaliacao: [],
    anexo: []
  });
  
formularioGerador: FormGroup = this.construtorFormulario.group({
    idAvaliador:[],
    justificativa:[],
    referencial:[],
    metodologia:[],
    cronograma:[],
    dataAssinatura:[]
});


  constructor(public router: Router,
    public construtorFormulario: FormBuilder,
    public service: Service,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.div = this.activatedRoute.snapshot.params.div;
    
    document.getElementById(this.div).style.display = 'block';
    this.idAvaliador = this.activatedRoute.snapshot.params.idAvaliador;
    this.formularioGerador.value.idAvaliador = this.idAvaliador;

    this.service.Get('preprojetos', this.id)
        .subscribe(
            result => {
                this.preProjeto = result;
                this.avaliador1 = this.idAvaliador == this.preProjeto.idAvaliador1;
                this.avaliador2 = this.idAvaliador == this.preProjeto.idAvaliador2;
                this.formulario.reset({
                  tema: this.preProjeto.tema,
                  idAluno1: this.preProjeto.idAluno1,
                  idAluno2: this.preProjeto.idAluno2,
                  idOrientador: this.preProjeto.idOrientador,
                  idCoOrientador: this.preProjeto.idCoOrientador,
                  idAvaliador1: this.preProjeto.idAvaliador1,
                  idAvaliador2: this.preProjeto.idAvaliador2,
                  nota1: this.preProjeto.nota1,
                  nota2: this.preProjeto.nota2,
                  observacao1: this.preProjeto.observacao1,
                  observacao2: this.preProjeto.observacao2,
                  aprovado: this.preProjeto.aprovado,
                  observacaoAprovacao: this.preProjeto.observacaoAprovacao,
                  estadoAvaliacao: this.preProjeto.estadoAvaliacao,
                  anexo: this.preProjeto.anexo,
                  id: this.preProjeto.id
                });
            },
            error => {
                alert(error);
            }
        );
  }

  gerarRelatorioAvaliacaoIndividual() {
    this.service.downloadArquivo('gerador/avaliacaoindividualpreprojeto/' + this.id, this.formularioGerador.value);
  }

  gerarRelatorioAvaliacaoFinal() { 
    this.service.Post<PreProjeto>('preprojetos', this.formulario.value)
        .subscribe(
            result => {
                this.preProjeto = result;
                this.service.downloadArquivo('gerador/avaliacaofinalpreprojeto/' + this.id, null);
            },
            error => {
                alert(error);
            }
        );
  }

  onCadastrar() {    
    this.service.Post<PreProjeto>('preprojetos', this.formulario.value)
        .subscribe(
            result => alert('Avaliação cadastrada com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/preprojeto/avaliacao', this.id, this.idAvaliador], { relativeTo: this.activatedRoute })
            },
            () => this.router.navigate(['/preprojeto/editar', this.id, 3])
        );
  }
}
