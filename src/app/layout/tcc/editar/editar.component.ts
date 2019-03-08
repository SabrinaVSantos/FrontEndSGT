import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aluno } from '../../../model/aluno.model';
import { Professor } from '../../../model/professor.model';
import { TCC } from '../../../model/tcc.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
  animations: [routerTransition()]
})
export class EditarComponent implements OnInit {
  id: number;
  div: number;
  idAvaliador: number;
  tcc: TCC;
  alunos: Aluno[];
  professores: Professor[];
  formulario: FormGroup = this.construtorFormulario.group({
    id: [],
    tema: [],
    idAluno1: [],
    idAluno2: [],
    idOrientador: [],
    idCoOrientador: [],
    idMembroBanca1: [],
    idMembroBanca2: [],
    nota1: [],
    nota2: []
  });
  formularioGerador: FormGroup = this.construtorFormulario.group({
    gerador: [],
    ressalva: [],
    dataDefesa: [],
	salaDefesa: [],
    horaDefesa: [],
    localDefesa: [],
    aprovacaoReprovacao: [],
    rg: [],
    orgaoExpedidor: [],
    cpf: [],
    rua: [],
    bairro: [],
    cidade: [], 
    dataAssinatura: [],
    anoDefesa: [],
    suplente: []
  });
  
  formularioAvaliacao: FormGroup = this.construtorFormulario.group({
	idAvaliador: [],
    introducao: [],
    referencialTeorico: [],
    desenvolvimentoAvaliacao: [],
    conclusoesReferenciasBibliograficas: [],
    estruturaOrdenacao: [],
    clarezaFluencia: [],
    dominioTema: [],
    dataAssinatura: [],
    observanciaTempo: []
  });

  formularioAvaliacaoFinal: FormGroup = this.construtorFormulario.group({
	notaTrabalhoEscritoOrientador: [],
	notaTrabalhoEscritoCoOrientador: [],
	notaTrabalhoEscritoMembro1: [],
	notaTrabalhoEscritoMembro2: [],
	notaTrabalhoOralOrientador: [],
	notaTrabalhoOralCoOrientador: [],
	notaTrabalhoOralMembro1: [],
    notaTrabalhoOralMembro2: [],
    observacoes: [],
    dataAssinatura: []
  });

  constructor(public router: Router,
    public construtorFormulario: FormBuilder,
    public service: Service,
    public activatedRoute: ActivatedRoute
  ) { }

  trocaDiv(prefixo, indice) {
    this.div = indice;
    this.service.trocaDiv(prefixo, this.div);
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.div = this.activatedRoute.snapshot.params.div;
    
    document.getElementById("loading").style.display = "block";

    this.trocaDiv('nav', this.div);
    
    this.service.Get('tccs', this.id)
        .subscribe(
            result => {
                this.tcc = result;
                this.formulario.reset({
                  tema: this.tcc.tema,
                  idAluno1: this.tcc.idAluno1,
                  idAluno2: this.tcc.idAluno2,
                  idOrientador: this.tcc.idOrientador,
                  idCoOrientador: this.tcc.idCoOrientador,
                  idMembroBanca1: this.tcc.idMembroBanca1,
                  idMembroBanca2: this.tcc.idMembroBanca2,
                  nota1: this.tcc.nota1,
                  nota2: this.tcc.nota2,
                  id: this.tcc.id
                });
            },
            error => {
                alert(error);
            }
        );

    this.service.Get('alunos')
        .subscribe(
            result => {
                this.alunos = result;
            },
            error => {
                alert(error);
            }
        );
    this.service.Get('professores')
        .subscribe(
            result => {
                this.professores = result;
            },
            error => {
                alert(error);
            },
            () => {
                document.getElementById("loading").style.display = "none";
            }
        );
  }

  deleteOrientacao(orientacao) {
    this.service.Delete('relatoriosorientacoes', orientacao.id)
      .subscribe(
          result => {
            alert('Orientação removida com sucesso!');
            var index = this.tcc.orientacoes.indexOf(orientacao);
            this.tcc.orientacoes.splice(index, 1);
          },
          error => {
              alert(error);
              this.router.navigate(['/tccs/editar', this.id])
          }
      );
  }

  onCadastrar() {
    if(this.formulario.value.id == null || this.formulario.value.id == ''
        || this.formulario.value.tema == null || this.formulario.value.tema == ''
        || this.formulario.value.idAluno1 == null || this.formulario.value.idAluno1 == ''
        || this.formulario.value.idOrientador == null || this.formulario.value.idOrientador == '') {
        alert('Preencha todos os campos obrigatórios!');
        return;
    } 
    if(this.formulario.value.idAluno1 == this.formulario.value.idAluno2) {
        alert('Os alunos selecionados devem ser diferentes entre si.');
        return;
    }
    if(this.formulario.value.idOrientador == this.formulario.value.idCoOrientador 
        || this.formulario.value.idOrientador == this.formulario.value.idMembroBanca1
        || this.formulario.value.idOrientador == this.formulario.value.idMembroBanca2) {
        alert('O orientador deve ser diferente dos demais membros da banca.');
        return;
    }
    if(this.formulario.value.idCoOrientador != null 
        && (this.formulario.value.idCoOrientador == this.formulario.value.idMembroBanca1
        || this.formulario.value.idCoOrientador == this.formulario.value.idMembroBanca2)) {
            alert('O co-orientador deve ser diferente dos demais membros da banca.');
            return;
    }
    if(this.formulario.value.idMembroBanca1 != null 
        && this.formulario.value.idMembroBanca1 == this.formulario.value.idMembroBanca2) {
            alert('Os membros da banca devem ser diferentes entre si.');
            return;
    }

    this.service.Post<TCC>('tccs', this.formulario.value)
        .subscribe(
            result => alert('TCC ' + result.tema + ' atualizado com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/tcc/editar', this.id], { relativeTo: this.activatedRoute })
            },  
            () => this.router.navigate(['/tcc/acompanhar'])
        );
  }

  gerarDocumento(url) {
    this.service.downloadArquivo(url + this.id, this.formularioGerador.value);
  }

  abreFicha(prefixo, indice, idAvaliador) {
      this.idAvaliador = idAvaliador;
      this.service.trocaDiv(prefixo, indice);
  }

  gerarFicha(url: string, form: any) {
    if(this.idAvaliador != null) {
        form.patchValue( {
            idAvaliador: this.idAvaliador
        });
    }
    this.service.downloadArquivo(url + this.id, form.value);
  }
}
