import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Aluno } from '../../../model/aluno.model';
import { Professor } from '../../../model/professor.model';
import { PreProjeto } from '../../../model/preProjeto.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
  animations: [routerTransition()]
})
export class EditarComponent implements OnInit {
  id: number;
  div: number;
  preProjeto: PreProjeto;
  alunos: Aluno[];
  professores: Professor[];
  formulario: FormGroup = this.construtorFormulario.group({
    id: [],
    tema: [],
    idAluno1: [],
    idAluno2: [],
    idAvaliador1:[],
    idAvaliador2:[],
    idOrientador: [],
    idCoOrientador: [],
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
    gerador:[],
    dataAssinatura: [],
    aluno: [],
    cpf: [],
    rg: [],
    orgaoExpedidor: [],
    email: [],
    telefone: [],
    celular: [],
    matricula: [],
    periodo: [],
    numeroDisciplinasCursadasAprovadas: [],
    titulo: [],
    orientador: [],
    coorientador: [],
    aluno2: [],
    cpf2: [],
    rg2: [],
    orgaoExpedidor2: [],
    email2: [],
    telefone2: [],
    celular2: [],
    matricula2: [],
    periodo2: [],
    numeroDisciplinasCursadasAprovadas2: [],
    diaAssinatura: [],
    mesAssinatura: [],
    anoAssinatura: [],
    semestre: [],
    ano: [],
    professor: [],
    professor2: [],
    data: [],
    coordenador: []
});


  constructor(
    public construtorFormulario: FormBuilder,
    public service: Service,
    public router: Router,
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

    this.service.Get('preprojetos', this.id)
        .subscribe(
            result => {
                this.preProjeto = result;
                this.formulario.reset({
                  tema: this.preProjeto.tema,
                  idAluno1: this.preProjeto.idAluno1,
                  idAluno2: this.preProjeto.idAluno2,
                  idAvaliador1: this.preProjeto.idAvaliador1,
                  idAvaliador2: this.preProjeto.idAvaliador2,
                  idOrientador: this.preProjeto.idOrientador,
                  idCoOrientador: this.preProjeto.idCoOrientador,
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

  download(file) {
    document.getElementById("loading").style.display = "block";

      this.service.Download('documentos/download/' + file)
        .subscribe(
            (resultBlob: Blob) => { 
                document.getElementById("loading").style.display = "none";
            
                var a = document.createElement("a"),
                fileURL = URL.createObjectURL(resultBlob);
                a.href = fileURL;
                a.download = file;
                window.document.body.appendChild(a);
                a.click();
                window.document.body.removeChild(a);
                URL.revokeObjectURL(fileURL);
                //var url = window.URL.createObjectURL(resultBlob);
                //window.open(url);
            }
        );
  }

  gerarDocumento(url) {
    this.service.downloadArquivo(url + this.id, this.formularioGerador.value);
  }

  onCadastrar() {
    if(this.formulario.value.tema == null || this.formulario.value.tema == ''
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
        || this.formulario.value.idOrientador == this.formulario.value.idAvaliador1
        || this.formulario.value.idOrientador == this.formulario.value.idAvaliador2) {
        alert('O orientador deve ser diferente dos demais membros da banca.');
        return;
    }
    if(this.formulario.value.idCoOrientador != null 
        && (this.formulario.value.idCoOrientador == this.formulario.value.idAvaliador1
        || this.formulario.value.idCoOrientador == this.formulario.value.idAvaliador2)) {
            alert('O co-orientador deve ser diferente dos demais avaliadores.');
            return;
    }
    if(this.formulario.value.idAvaliador1 != null 
        && this.formulario.value.idAvaliador1 == this.formulario.value.idAvaliador2) {
            alert('Os avaliadores devem ser diferentes entre si.');
            return;
    }

    this.service.Post<PreProjeto>('preprojetos', this.formulario.value)
        .subscribe(
            result => alert('Pré-projeto ' + result.tema + ' atualizado com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/preprojeto/editar', this.id], { relativeTo: this.activatedRoute })
            },
            () => this.router.navigate(['/preprojeto/listar'], { relativeTo: this.activatedRoute })
        
        );
  }
}
