import axios from 'axios';
import { URL_CEP_API } from '@env';

const axiosInstance = axios.create({ baseURL: URL_CEP_API });

export const findCep = async (cep:string) => {

    const response = await axiosInstance.get(`/${cep}.json`);
    return response;
};