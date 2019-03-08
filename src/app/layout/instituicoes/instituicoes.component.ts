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
  selector: 'app-instituicoes',
  templateUrl: './instituicoes.component.html',
  styleUrls: ['./instituicoes.component.scss'],
  animations: [routerTransition()]
})
export class InstituicoesComponent implements OnInit {

  constructor(private service: Service) {

    
   }

  ngOnInit() {
    
  }

}
