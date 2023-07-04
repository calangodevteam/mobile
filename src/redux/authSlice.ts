import { createSlice } from '@reduxjs/toolkit';
import { Aluno } from '../@types/aluno';

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
      signOut: (state) => {
        state.aluno = null;
        state.signed = false;
      },
    },
  });

export const { setAluno, signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
