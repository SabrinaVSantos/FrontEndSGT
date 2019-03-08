import { Aluno } from "./aluno.model";
import { Professor } from "./professor.model";
import { RelatorioOrientacao } from "./relatorioOrientacao.model";

export class TCC {
    public id: number;
    public nota1: string;
    public nota2: string;
    public tema: string;
    public aluno1: Aluno;
    public aluno2: Aluno;
    public orientador: Professor;
    public coOrientador: Professor;
    public membroBanca1: Professor;
    public membroBanca2: Professor;
    public orientacoes: RelatorioOrientacao[];
    public idAluno1: number;
    public idAluno2: number;
    public idOrientador: number;
    public idCoOrientador: number;
    public idMembroBanca1: number;
    public idMembroBanca2: number;
}