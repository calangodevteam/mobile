import { Aluno } from './aluno';
import { Questao } from './questao';
import { TemasAreas } from './temasAreas';


export interface Questionario {
  id: number;
  titulo: string;
  qtdQuestoes: number;
  tempoDuracao: number;
  tempoDisponivel: number;
  dificuldade: string;
  temasAreas: TemasAreas;
  questoes: Questao[];
  dataCriacao: string;
}

export interface Resultado{
  id?: number;
  aluno: Aluno,
  questionario: Questionario,
  inicio?: string,
  termino?: string,
  acertos: number,
}
