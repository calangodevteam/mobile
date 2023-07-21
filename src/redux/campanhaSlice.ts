import { Questionario } from './../types/questionario';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findQuestionariosNotAluno } from '../services/ApiCalango';
import { PURGE } from 'redux-persist';

interface QuestSliceData {
    loading: boolean,
    campanhas: Questionario[] | null,
    error:string
}

const initialState: QuestSliceData = {
    loading: false,
    campanhas: null,
    error: '',
};

export const fetchCamp = createAsyncThunk(
  'campanha/fetchCamp',
  async (alunoId: number) => {
    try {
      const res = await findQuestionariosNotAluno(alunoId);
    const data = res.data;

    if (res.data.empty){
      return null;
    }
    else {
      return data.content as Questionario[];
    }
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
        state.campanhas = action.payload;
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
