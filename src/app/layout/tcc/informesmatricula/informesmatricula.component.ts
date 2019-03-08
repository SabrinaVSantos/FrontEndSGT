import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-informesmatricula',
  templateUrl: './informesmatricula.component.html',
  styleUrls: ['./informesmatricula.component.scss'],
  animations: [routerTransition()]
})
export class InformesmatriculaComponent implements OnInit {
  formulario: FormGroup = this.construtorFormulario.group({
    semestre: [],
    ano: [],
    professor: [],
    professor2: [],
    data: [],
    coordenador: []
  });

  constructor(public router: Router,
    public construtorFormulario: FormBuilder,
    public service: Service,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

  }
}
