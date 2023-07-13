import { Resultado } from '../types/questionario';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findResultadoByAluno } from '../services/ApiCalango';

interface QuestSliceData {
    loading: boolean,
    resultados: Resultado[] | null,
    error:string
}

const initialState: QuestSliceData = {
    loading: false,
    resultados: null,
    error: '',
};

export const fetchResult = createAsyncThunk(
  'result/fetchResult',
  async (alunoId: number) => {
    try {
      const res = await findResultadoByAluno(alunoId);
      const content = await res.data.content;

      return content as Resultado[];

    } catch (error: any) {
      throw new Error('Erro ao obter dados: ' + error.message);
    }
  }
);

const resultadoSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchResult.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchResult.fulfilled, (state, action) => {
        state.loading = false;
        state.resultados = action.payload;
      });
      builder.addCase(fetchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : '';
      });
    },

});

export default resultadoSlice.reducer;
