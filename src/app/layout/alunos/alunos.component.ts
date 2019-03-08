import { Component, OnInit } from '@angular/core';
import { Service } from '../../shared/services/services.service';
import { routerTransition } from '../../router.animations';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss'],
  animations: [routerTransition()]
})
export class AlunosComponent implements OnInit {

  constructor(private service: Service) {

    
   }

  ngOnInit() {
    
  }

}
