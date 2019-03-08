import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreProjeto } from '../../../model/preProjeto.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  animations: [routerTransition()]
})
export class UploadComponent implements OnInit {
  id: number;
  preProjeto: PreProjeto;
  formulario: FormGroup = this.construtorFormulario.group({
    preProjeto: [],
    fichaInscricao: [],
    cartaAceite: [],
    historico: []
  });

  constructor(public router: Router,
    public construtorFormulario: FormBuilder,
    public service: Service,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    
    this.service.Get('preprojetos', this.id)
        .subscribe(
            result => {
                this.preProjeto = result;
                this.formulario.reset({
                  id: this.preProjeto.id
                });
            },
            error => {
                alert(error);
            }
        );
  }

  onFileChange(event, nome) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formulario.get(nome).setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('preProjeto', this.formulario.get('preProjeto').value);
    input.append('fichaInscricao', this.formulario.get('fichaInscricao').value);
    input.append('historico', this.formulario.get('historico').value);
    input.append('cartaAceite', this.formulario.get('cartaAceite').value);
    return input;
  }

  onCadastrar() {
    const formModel = this.prepareSave();
    this.service.Upload('documentos/' + this.preProjeto.aluno1.id, formModel)
        .subscribe(
            result => alert('Documentos enviados com sucesso!'),
            error => {
                alert(error);
                this.router.navigate(['/preprojeto/upload', this.preProjeto.id], { relativeTo: this.activatedRoute })
            },
            () => this.router.navigate(['/preprojeto/editar', this.preProjeto.id, 2])
        );
  }

}
