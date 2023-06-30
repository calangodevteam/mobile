import axios from 'axios';
import { Aluno } from '../@types/aluno';
import { URL_CALANGO_API } from '@env';
import { Resultado } from '../@types/questionario';

const axiosInstance = axios.create({ baseURL: URL_CALANGO_API});

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


// Questionario

export const findQuestionarios = async () => {

    const response = await axiosInstance.get('/questionarios');
    return response;
};

// Resultado

export const findResultadoByAluno = async (alunoId:number) => {

    const response = await axiosInstance.get(`/questionarios/resultados?alunoid=${alunoId}`);
    return response;
};

export const createResultado = async (resultado: Resultado) => {

    const response = await axiosInstance.post('/questionarios/resultados',resultado);
    return response;
};

export const updateResultado = async (resultado: Resultado) => {

    const response = await axiosInstance.put(`/questionarios/resultados/${resultado.id}`, resultado);
    return response;
};

// Pontuação

export const findPontuacaoByAluno = async (alunoId:number) => {

    const response = await axiosInstance.get(`/alunos/${alunoId}/pontuacao`);
    return response;
};
