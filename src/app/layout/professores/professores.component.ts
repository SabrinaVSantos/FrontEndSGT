import { Component, OnInit } from '@angular/core';
import { Service } from '../../shared/services/services.service';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss'],
  animations: [routerTransition()]
})
export class ProfessoresComponent implements OnInit {

  constructor(private service: Service) {

    
  }

  ngOnInit() {
  }

}
