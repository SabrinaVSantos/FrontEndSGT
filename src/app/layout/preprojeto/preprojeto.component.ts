import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../shared/services/services.service';

@Component({
  selector: 'app-preprojeto',
  templateUrl: './preprojeto.component.html',
  styleUrls: ['./preprojeto.component.scss'],
  animations: [routerTransition()]
})
export class PreprojetoComponent implements OnInit {

  constructor(private service: Service) { }

  ngOnInit() {
  }

}
