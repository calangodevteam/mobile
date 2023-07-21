import { createSlice } from '@reduxjs/toolkit';
import { Aluno } from '../types/aluno';
import { PURGE } from 'redux-persist';

interface AuthSliceData {
    signed: boolean,
    aluno: Aluno | null,
}

const initialState: AuthSliceData = {
    signed: false,
    aluno: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAluno: (state, action) => {
        state.aluno = action.payload;
      },
      signIn:  (state, action) => {
        state.aluno = action.payload.aluno;
        state.signed = true;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, () => {
        return initialState;
      });
    },
  });

export const { setAluno, signIn } = authSlice.actions;

export default authSlice.reducer;
