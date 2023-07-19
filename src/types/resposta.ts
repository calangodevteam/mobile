export interface Resposta {
    id?: number,
	aluno: {
        id:number,
        nome?:string,
    },
	questionario: {
        id:number,
        titulo?:string,
    },
    questao: {
        id:number,
        texto?:string,
    },
    opcao: {
        id:number,
        texto?:string,
    },
}
