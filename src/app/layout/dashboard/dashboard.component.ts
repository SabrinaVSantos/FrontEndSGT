import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor() {
        this.sliders.push(
            {
                imagePath: 'assets/images/slide1.png',
                label: '',
                text:
                    ''
            },
            {
                imagePath: 'assets/images/slide2.png',
                label: '',
                text: ''
            },
            {
                imagePath: 'assets/images/slide3.png',
                label: '',
                text:
                    ''
            }
        );

        this.alerts.push(
            {
                id: 2,
                type: 'warning',
                message: `Fique atento! Não perca o prazo final para inscrição no TCC.`
            }
          
        );
    


}

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
