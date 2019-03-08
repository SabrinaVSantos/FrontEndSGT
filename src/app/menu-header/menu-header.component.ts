import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  template: `
    <img src="assets/images/logoIFG.png" width="150px" style="border-radius: 50%;" class="user-avatar" />
            <h1>{{Message}}</h1>
    `,
  styleUrls: ['../login/login.component.scss']
})

export class MenuHeaderComponent { 
  @Input() Message = 'SGT';
}




