import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findAllPontuacoes } from '../services/ApiCalango';
import { Pontuacao } from '../types/aluno';

interface PontuacaoSliceData {
    loading: boolean,
    pontuacoes: Pontuacao[] | null,
    error:string
}

const initialState: PontuacaoSliceData = {
    loading: false,
    pontuacoes: null,
    error: '',
};

export const fetchPoints = createAsyncThunk(
  'pontuacao/fetchPoints',
  async () => {
    try {
      const res = await findAllPontuacoes();
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

const pontuacaoSlice = createSlice({
    name: 'pontuacao',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchPoints.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.pontuacoes = action.payload;
      });
      builder.addCase(fetchPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : '';
      });
    },

});

export default pontuacaoSlice.reducer;
