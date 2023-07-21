import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findAllPontuacoes, findPontuacaoByAluno } from '../services/ApiCalango';
import { Pontuacao } from '../types/aluno';
import { PageRequest, PageResponse } from '../types/page';
import { PURGE } from 'redux-persist';

interface PontuacaoSliceData {
    loading: boolean,
    pontuacoes: Pontuacao[] | null,
    pageResponse: PageResponse | null,
    pontuacao: Pontuacao | null;
    error:string
}

const initialState: PontuacaoSliceData = {
    loading: false,
    pontuacoes: null,
    pageResponse: null,
    pontuacao: null,
    error: '',
};

export const fetchPoints = createAsyncThunk(
  'pontuacao/fetchPoints',
  async (pageble?:PageRequest) => {
    try {
      const res = pageble ? await findAllPontuacoes(pageble) : await findAllPontuacoes();
      const data = await res.data;

      if (res.data.empty){
        return null;
      }
      else {
        const page:PageResponse = {
          first: data.first,
          last: data.last,
          numberOfElements: data.numberOfElements,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        };
        const pontuacoes = data.content as Pontuacao[];
        return {page, pontuacoes};
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
        if (action.payload != null){
          state.pageResponse = action.payload.page;
          state.pontuacoes = action.payload.page.first ? action.payload.pontuacoes : ([...state.pontuacoes!, ...action.payload.pontuacoes]);
        }
      });
      builder.addCase(fetchPointUsu.fulfilled, (state, action) => {
        state.loading = false;
        state.pontuacao = action.payload;
      });
      builder.addCase(fetchPoints.rejected || fetchPointUsu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : '';
      });
      builder.addCase(PURGE, () => {
        return initialState;
      });
    },

});

export default pontuacaoSlice.reducer;
