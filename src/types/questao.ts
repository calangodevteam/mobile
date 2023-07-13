import { TemasAreas } from './temasAreas';


export interface Opcao {
  id: number;
  texto: string;
}

export interface Figura {
  id: number;
  atributo: string;
  descricao: string;
}

export interface Artigo {
  id: number;
  url: string;
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  autor: string[];
}

export interface Questao {
  id: number;
  texto: string;
  categoriaBloom: string;
  artigos: Artigo[];
  figuras: Figura[];
  opcoes: Opcao[];
  opcaoCorreta: Opcao;
  temasAreas: TemasAreas;
}
