import { Aluno } from "./aluno.model";
import { Professor } from "./professor.model";

export class PreProjeto {
    public id: number;
    public tema: string;
    public anexo: string;
    public observacao1: string;
    public observacao2: string;
    public nota1: number;
    public nota2: number;
    public notaFinal: number;
    public aprovado: boolean;
    public observacaoAprovacao: string;
    public aluno1: Aluno;
    public aluno2: Aluno;
    public avaliador1: Professor;
    public avaliador2: Professor;
    public orientador: Professor;
    public coOrientador: Professor;
    public idAluno1: number;
    public idAluno2: number;
    public idAvaliador1: number;
    public idAvaliador2: number;
    public idOrientador: number;
    public idCoOrientador: number;
    public estadoAvaliacao: string;
    public arquivoPreProjeto: string;
    public arquivoFichaInscricao: string;
    public arquivoHistorico: string;
    public arquivoCartaAceite: string;

}