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

export interface Resposta{
  alunoId: number,
  questionario: Questionario,
  qtd_acertos: number,
  data_respondido: string,
}
