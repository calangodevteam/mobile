import {CursosUnidade} from './cursos_unidade';
import {Endereco} from './endereco';

export interface Aluno {
  id?: number;
  nome: string;
  email: string;
  fotoPerfil: string;
  endereco: Endereco;
  cursosUnidade: CursosUnidade;
}
export interface Pontuacao {
  id: number;
  estrelas: number;
  nivel: number;
  experiencia: number;
  proxNivel: number;
  aluno: Aluno;
}

export interface PontuacaoUpdate {
  estrelas: number;
  experiencia: number;
  aluno_id: number;
}
