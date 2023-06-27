import axios from 'axios';
import { Aluno } from '../@types/aluno';
import { URL_CALANGO_API } from '@env';

const axiosInstance = axios.create({ baseURL: URL_CALANGO_API });

// Aluno

export const findAlunoByEmail = async (email:string) => {

    const response = await axiosInstance.get(`/alunos?email=${email}`);
    return response;
};

export const createAluno = async (aluno:Aluno) => {

    const response = await axiosInstance.post('/alunos', aluno);
    return response;
};


// Instituição

export const findInstituicoes = async () => {

    const response = await axiosInstance.get('/instituicoes');
    return response;
};

export const findUnidadesByInst = async (id:number) => {

    const response = await axiosInstance.get(`/instituicoes/${id}/unidades`);
    return response;
};

export const findCursosUnidade = async (id:number) => {

    const response = await axiosInstance.get(`/unidades/${id}/cursos`);
    return response;
};
