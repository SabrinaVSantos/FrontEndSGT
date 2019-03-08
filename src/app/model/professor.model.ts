import { Instituicao } from "./instituicao.model";

export class Professor {
    public id: number;
    public nome: string;
    public email: string;
    public siape: string;
    public lattes: string;
    public areaPesquisa: string;
    public escolaridade: string;
    public nde: boolean;
    public perfil: string;
    public instituicao: Instituicao;
    public idInstituicao: string;
    public senha: string;
}
        