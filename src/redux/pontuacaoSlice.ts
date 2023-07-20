import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findAllPontuacoes, findPontuacaoByAluno } from '../services/ApiCalango';
import { Pontuacao } from '../types/aluno';
import { PageRequest } from '../types/page';

interface PontuacaoSliceData {
    loading: boolean,
    pontuacoes: Pontuacao[] | null,
    pontuacao: Pontuacao | null;
    error:string
}

const initialState: PontuacaoSliceData = {
    loading: false,
    pontuacoes: null,
    pontuacao: null,
    error: '',
};

export const fetchPoints = createAsyncThunk(
  'pontuacao/fetchPoints',
  async (pageble:PageRequest) => {
    try {
      const res = await findAllPontuacoes(pageble);
      const data = await res.data;

      if (res.data.empty){
        return null;
      }
      else {
        return data.content as Pontuacao[];
      }

    } catch (error: any) {
      throw new Error('Erro ao obter dados: ' + error.message);
    }
  }
);

export const fetchPointUsu = createAsyncThunk(
  'pontuacao/fetchPointUsu',
  async (id:number) => {
    try {
      const res = await findPontuacaoByAluno(id);
      const data = await res.data;

      return data as Pontuacao;

    } catch (error: any) {
      throw new Error('Erro ao obter dados: ' + error.message);
    }
  }
);

const pontuacaoSlice = createSlice({
    name: 'pontuacao',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchPoints.pending || fetchPointUsu.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.pontuacoes = action.payload;
      });
      builder.addCase(fetchPointUsu.fulfilled, (state, action) => {
        state.loading = false;
        state.pontuacao = action.payload;
      });
      builder.addCase(fetchPoints.rejected || fetchPointUsu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : '';
      });
    },

});

export default pontuacaoSlice.reducer;
