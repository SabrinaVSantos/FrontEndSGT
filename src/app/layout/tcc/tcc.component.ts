import { Component, OnInit } from '@angular/core';
import { Service } from '../../shared/services/services.service';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-tcc',
  templateUrl: './tcc.component.html',
  styleUrls: ['./tcc.component.scss'],
  animations: [routerTransition()]
})
export class TccComponent implements OnInit {

  constructor(private service: Service) { }

  ngOnInit() {
  }

}
