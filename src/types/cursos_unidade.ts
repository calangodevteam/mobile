import { Endereco } from './endereco';
import { Modalidade } from './enums';
import { Instituicao } from './instituicao';

export interface Unidade {
  id:number;
  nome:string;
  endereco?:Endereco;
  instituicao: Instituicao;
}

export interface Curso {
  id:number;
  nome:string;
}

export interface CursosUnidade {
  id:number;
  modalidade?:Modalidade;
  curso?:Curso;
  unidade?:Unidade;
}

