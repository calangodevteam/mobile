import axios from 'axios';
import { Aluno } from '../types/aluno';
import { URL_CALANGO_API } from '@env';
import { Resultado } from '../types/questionario';
import { Resposta } from '../types/resposta';
import { PageRequest } from '../types/page';

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

export const findQuestionariosNotAluno = async (alunoId:number) => {

    const response = await axiosInstance.get(`/questionarios/page?alunoid=${alunoId}`);
    return response;
};

// Resultado

export const findResultadoByAluno = async (alunoId:number, pageble?: PageRequest) => {
    if (pageble){

        let sortString = '';
        pageble.sort?.forEach( sort =>{
            sortString += '&sort=' + sort.orderBy + ',' + sort.direction;
        });
        const request = `/questionarios/resultados?alunoid=${alunoId}&page=${pageble.page ? pageble.page : 0}&size=${pageble.size ? pageble.size : 10}${sortString}`;
        const response = await axiosInstance.get(request);
        return response;
    }

    const response = await axiosInstance.get('/pontuacoes');
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

// Resposta

export const createRespostaEmMassa = async (respostas: Resposta[]) => {

    const response = await axiosInstance.post('/questionarios/respostas', respostas);
    return response;
};

// Pontuação

export const findPontuacaoByAluno = async (alunoId:number) => {

    const response = await axiosInstance.get(`/alunos/${alunoId}/pontuacao`);
    return response;
};

export const findAllPontuacoes = async (pageble?: PageRequest) => {

    if (pageble){

        let sortString = '';
        pageble.sort?.forEach( sort =>{
            sortString += '&sort=' + sort.orderBy + ',' + sort.direction;
        });
        const request = `/pontuacoes?page=${pageble.page ? pageble.page : 0}&size=${pageble.size ? pageble.size : 10}${sortString}`;
        const response = await axiosInstance.get(request);
        return response;
    }

    const response = await axiosInstance.get('/pontuacoes');
    return response;
};
