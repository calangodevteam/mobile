const pontuacao = [
    {
        nome:'Fácil',
        moedas:6,
        exp: 100,
    },
    {
        nome:'Mediano',
        moedas:8,
        exp: 200,
    },
    {
        nome:'Difícil',
        moedas:12,
        exp: 400,
    },
];

export const moedasGanhas = (dificuldade:string, acertos:number) => {

    for (let dif of pontuacao){
        if (dif.nome == dificuldade)
            {return {moedas: (dif.moedas * acertos), exp: (dif.exp * acertos)};}
        else
            {continue;}
    }
    return {moedas: 0, exp: 0};
};
