import {Resultado} from '../types/questionario';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {findResultadoByAluno} from '../services/ApiCalango';
import {PageRequest, PageResponse} from '../types/page';
import {PURGE} from 'redux-persist';

interface RequestInterface {
  alunoId: number;
  pageble?: PageRequest;
}
interface QuestSliceData {
  loading: boolean;
  resultados: Resultado[] | null;
  pageResponse: PageResponse | null;
  error: string;
}

const initialState: QuestSliceData = {
  loading: false,
  resultados: null,
  pageResponse: null,
  error: '',
};

export const fetchResult = createAsyncThunk(
  'result/fetchResult',
  async ({alunoId, pageble}: RequestInterface) => {
    try {
      const res = await findResultadoByAluno(alunoId, pageble);
      const data = await res.data;
      const page: PageResponse = {
        first: data.first,
        last: data.last,
        empty: data.empty,
        numberOfElements: data.numberOfElements,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
      };
      const resultados = data.content as Resultado[];
      return {page, resultados};
    } catch (error: any) {
      throw new Error('Erro ao obter dados: ' + error.message);
    }
  },
);

const resultadoSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchResult.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchResult.fulfilled, (state, action) => {
      state.loading = false;
      state.pageResponse = action.payload.page;
      if (!action.payload.page.empty) {
        state.resultados = action.payload.page.first
          ? action.payload.resultados
          : [...state.resultados!, ...action.payload.resultados];
      }
    });
    builder.addCase(fetchResult.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ? action.error.message : '';
    });
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export default resultadoSlice.reducer;
