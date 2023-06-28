import React, {createContext, useState, useEffect, useContext, useMemo} from 'react';
import { Aluno } from '../@types/aluno';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  signed: boolean,
  aluno: Aluno | null,
  loading: boolean,
  signIn(alunoResponse: Aluno): Promise<void>,
  signOut(): void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }:any) => {

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedAluno = await AsyncStorage.getItem('alunoLogged');
      // const storagedToken = await AsyncStorage.getItem('alunoToken');

      if (storagedAluno /*&& storagedToken*/) {
        setAluno(JSON.parse(storagedAluno));
      }

      setLoading(false);
    }

    loadStorageData();
  });

  async function signIn(alunoResponse: Aluno) {
    setAluno(alunoResponse);

    await AsyncStorage.setItem('alunoLogged', JSON.stringify(alunoResponse));
    // await AsyncStorage.setItem('alunoToken', token);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setAluno(null);
  }

  const authMemo = useMemo(() => ({signed: !!aluno, aluno, loading, signIn, signOut}), [aluno, loading]);

  return (
    <AuthContext.Provider
      value={authMemo}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {AuthProvider, useAuth};
