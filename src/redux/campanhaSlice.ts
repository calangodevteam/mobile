import { Questionario } from './../types/questionario';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findQuestionariosNotAluno } from '../services/ApiCalango';
import { PURGE } from 'redux-persist';
import { PageRequest, PageResponse } from '../types/page';

interface RequestInterface {
  alunoId: number,
  pageble?:PageRequest
}
interface QuestSliceData {
    loading: boolean,
    campanhas: Questionario[] | null,
    pageResponse: PageResponse | null,
    error:string
}

const initialState: QuestSliceData = {
    loading: false,
    campanhas: null,
    pageResponse: null,
    error: '',
};

export const fetchCamp = createAsyncThunk(
  'campanha/fetchCamp',
  async ({alunoId, pageble}:RequestInterface) => {
    try {
      const res = await findQuestionariosNotAluno(alunoId,pageble);
      const data = res.data;

      const page:PageResponse = {
        first: data.first,
        last: data.last,
        empty:data.empty,
        numberOfElements: data.numberOfElements,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
      };
      const campanhas = data.content as Questionario[];
      return {page, campanhas};

    } catch (error: any) {
      throw new Error('Erro ao obter dados: ' + error.message);
    }
  });

const campanhaSlice = createSlice({
    name: 'campanha',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchCamp.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchCamp.fulfilled, (state, action) => {
        state.loading = false;
        state.pageResponse = action.payload.page;
        if (!action.payload.page.empty){
          state.campanhas = action.payload.page.first ? action.payload.campanhas : ([...state.campanhas!, ...action.payload.campanhas]);
        }
      });
      builder.addCase(fetchCamp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : '';
      });
      builder.addCase(PURGE, () => {
        return initialState;
      });
    },

});

export default campanhaSlice.reducer;
