export interface AreaConhecimento {
  id: number;
  nome: string;
  areaConhecimentoPai: AreaConhecimento | null;
}
export interface Tema {
  id: number;
  nome: string;
}

export interface TemasAreas {
  id: number;
  tema?: Tema;
  areaConhecimento?: AreaConhecimento;
}
