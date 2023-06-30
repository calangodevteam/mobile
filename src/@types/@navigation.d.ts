import { Questionario } from './questionario';

export interface ResultadoNavigation {
  acertos: number,
  qtdQuestoes: number;
  dificuldade:string,
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      inicial: undefined;
      login: undefined;
      cadastro: undefined;
      app: undefined;
      camp_historico: undefined;
      camp_escolha: undefined;
      camp_questoes: Questionario;
      camp_resultado: ResultadoNavigation;
    }
  }
}
