import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { getHeader } from './header/header.component';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { TCC } from '../../model/tcc.model';
import { PreProjeto } from '../../model/preProjeto.model';
import { Aluno } from '../../model/aluno.model';
import { Professor } from '../../model/professor.model';

@Injectable()
export class Service {

    constructor(
        private http: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    /**
      * Obtem os dados a partir da rota passada
      * @param route rota a ser consumida
      * @param value valor do parametro de busca
       * @param param valor a ser adicionado no parametro do cabecalho
       */
    Get(route: string, value?: any, param?: any, reponseType: string = 'json'): Observable<any> {
        return this.http.get(`${environment.apiEndPoint}${route}${value !== undefined ? '/' + value : ''}`, getHeader(param, reponseType))
            .pipe(
                retry(3),
                map(response => response),
                catchError(err => this.handleError(err)));
    }

    /**
     * Envia um objeto para persistencia.
     * @param route rota a ser consumida
     * @param obj objeto a ser persistido
     */
    Post<T>(route: string, obj: T) {
        return this.http.post<T>(`${environment.apiEndPoint}${route}`, obj, getHeader())
            .pipe(catchError(err => this.handleError(err)));
    }

    Download(route: string) {
        const httpOptions = {
            responseType: 'blob' as 'json',
            headers: new HttpHeaders({
                responseType : 'blob',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
           })
       };
       
        return this.http.get(`${environment.apiEndPoint}${route}`, httpOptions)
            .pipe(catchError(err => this.handleError(err)));
    }

    DownloadPost(route: string, obj: any) {
        const httpOptions = {
            responseType: 'blob' as 'json',
            headers: new HttpHeaders({
                'accept': 'application/pdf',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                responseType : 'blob'
           })
       };
       
        return this.http.post<any>(`${environment.apiEndPoint}${route}`, obj, httpOptions)
            .pipe(catchError(err => this.handleError(err)));
    }

    Upload(route: string, obj: any) {
        const httpOptions = {
            headers: new HttpHeaders({
            'Accept':  'application/json'
           })
       };
       
        return this.http.post<any>(`${environment.apiEndPoint}${route}`, obj, httpOptions)
            .pipe(catchError(err => this.handleError(err)));
    }

    /**
     * Envia um objeto para atualização.
     * @param route rota a ser consumida
     * @param obj objeto a ser atualizado
     */
    Put<T>(route: string, id: any, obj: T) {
        return this.http.put<T>(`${environment.apiEndPoint}${route}/${id}`, obj, getHeader()).pipe(catchError(err => this.handleError(err)));
    }

    /**
     * Deleta um objeto a partir do valor passado na requisição.
     * @param route rota a ser consumida
     * @param value valor do parametro da rota
     */
    Delete(route: string, value: any) {
        return this.http.delete(`${environment.apiEndPoint}/${route}/${value}`, getHeader()).pipe(catchError(err => this.handleError(err)));
    }

    /**
     * Realiza o login do usuario
     * @param user objeto a ser persistido
     */
    Login(user: any) {
        return this.http.post<any>(`${environment.apiEndPointLogin}`, user, getHeader())
            .pipe(
                map(response => {
                    console.log('login com sucesso[' + JSON.stringify(response) + ']');
                    localStorage.setItem('usuario', JSON.stringify(response));
                }),
                catchError(error => this.handleError(error)));
    }

    get usuario(): any {
        return JSON.parse(localStorage.getItem('usuario'));
    }

    isAluno() {
        return this.usuario.perfil == 'ALUNO';
    }

    isProfessor() {
        return this.usuario.perfil == 'PROFESSOR';
    }

    isCoordenador() {
        return this.usuario.perfil == 'COORDENADOR';
    }

    isPodeEditarAluno(aluno: Aluno) {
        let editavel = this.isCoordenador();
        if(!editavel) {
            let idUsuario = this.usuario.id;
            editavel = idUsuario == aluno.id;
        }
        return editavel;
    }
    
    isPodeEditarProfessor(professor: Professor) {
        let editavel = this.isCoordenador();
        if(!editavel) {
            let idUsuario = this.usuario.id;
            editavel = idUsuario == professor.id;
        }
        return editavel;
    }
    
    isPodeEditarTCC(tcc: TCC) {
        let editavel = this.isCoordenador();
        if(!editavel) {
            let idUsuario = this.usuario.id;
            editavel = idUsuario == tcc.idAluno1 || idUsuario == tcc.idAluno2 ||
                idUsuario == tcc.idOrientador ||idUsuario == tcc.idCoOrientador ||
                idUsuario == tcc.idMembroBanca1 || idUsuario == tcc.idMembroBanca2;
        }
        return editavel;
    }
    
    isPodeAvaliarTCC(idAvaliador:number) {
        let editavel = this.isCoordenador() && idAvaliador != null;
        if(!editavel) {
            let idUsuario = this.usuario.id;
            editavel = idUsuario == idAvaliador;
        }
        return editavel;
    }

    isPodeRemoverTCC(tcc: TCC) {
        let editavel = this.isCoordenador();
        if(!editavel) {
            let idUsuario = this.usuario.id;
            editavel = idUsuario == tcc.idOrientador ||idUsuario == tcc.idCoOrientador ||
                idUsuario == tcc.idMembroBanca1 || idUsuario == tcc.idMembroBanca2;
        }
        return editavel;
    }
    
    isPodeOrientarTCC(tcc: TCC) {
        let orientavel = this.isCoordenador();
        if(!orientavel) {
            let idUsuario = this.usuario.id;
            orientavel = idUsuario == tcc.idOrientador || idUsuario == tcc.idCoOrientador;
        }
        return orientavel;
    }

    isPodeEditarPreProjeto(preProjeto: PreProjeto) {
        let editavel = this.isCoordenador();
        if(!editavel) {
            let idUsuario = this.usuario.id;
            editavel = idUsuario == preProjeto.idAluno1 || idUsuario == preProjeto.idAluno2 ||
                idUsuario == preProjeto.idOrientador ||idUsuario == preProjeto.idCoOrientador ||
                idUsuario == preProjeto.idAvaliador1 || idUsuario == preProjeto.idAvaliador2;
        }
        return editavel;
    }

    isPodeGerarFichaPreProjeto(preProjeto: PreProjeto) {
        let editavel = this.isCoordenador();
        if(!editavel) {
            let idUsuario = this.usuario.id;
            editavel = idUsuario == preProjeto.idOrientador || idUsuario == preProjeto.idCoOrientador ||
                idUsuario == preProjeto.idAvaliador1 || idUsuario == preProjeto.idAvaliador2;
        }
        return editavel;
    }

    isPodeAvaliarPreProjeto(idAvaliador: number, preProjeto: PreProjeto) {
        let avaliavel = this.isCoordenador() && preProjeto.idAvaliador1 != null && preProjeto.idAvaliador2 != null;
        if(!avaliavel) {
            let idUsuario = this.usuario.id;
            avaliavel = idUsuario == idAvaliador;
        }
        return avaliavel;
    }

    downloadArquivo(url, obj) {
        
        document.getElementById("loading").style.display = "block";

        this.DownloadPost(url, obj)
            .subscribe(
              (resultBlob: Blob) => { 
                //var a = document.createElement("a"),
                //fileURL = URL.createObjectURL(resultBlob);
                //a.href = fileURL;
                //a.download = "documento";
                //window.document.body.appendChild(a);
                //a.click();
                //window.document.body.removeChild(a);
                //URL.revokeObjectURL(fileURL);
                document.getElementById("loading").style.display = "none";

                var url = window.URL.createObjectURL(resultBlob);
                window.open(url);
              }
            );
    }
    
    trocaDiv(prefixo, indice) {
        this.fechaDiv(prefixo);
        document.getElementById(prefixo + indice).style.display = 'block';
        document.getElementById(prefixo + 'tab' + indice).style.backgroundColor = 'green';
        document.getElementById(prefixo + 'tab' + indice).style.color = 'white';
    }

    fechaDiv(prefixo) {
        let existeDiv = true;
        let i = 1;
        while(existeDiv) {
            var element = document.getElementById(prefixo + i);
            var elementTab = document.getElementById(prefixo + 'tab' + i++);
            if(element != null) {
                element.style.display = 'none';
                if(elementTab != null) {
                    elementTab.style.backgroundColor = 'white';
                    elementTab.style.color = 'gray';
                }
            } else {
                existeDiv = false;
            }
        }
    }

    private handleError(error: HttpErrorResponse) {
        console.log('erro ', error);
        return throwError(error.error.message);
    };
}
