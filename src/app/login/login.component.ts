import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Service } from '../shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router,
        public construtorFormulario: FormBuilder,
        public service: Service,
        public activatedRoute: ActivatedRoute
    ) { }
    formulario: FormGroup = this.construtorFormulario.group({
        login: [],
        senha: []
    });
    ngOnInit() { }

    onLoggedin() {        
        if(this.formulario.value.login == null || this.formulario.value.login == ''
            || this.formulario.value.senha == null || this.formulario.value.senha == '') {
            alert('Informe login e senha válidos!');
        } else {
            this.service.Login(this.formulario.value)
                .subscribe(
                    result => console.log(result),
                    error => {
                        console.log('erro login mensagem[' + error + ']');
                        alert(error);
                    },
                    () => this.router.navigate(['/dashboard'], { relativeTo: this.activatedRoute })
                );
        }
    }
} 