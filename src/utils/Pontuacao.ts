const pontuacao = [
    {
        nome:'Fácil',
        moedas:3,
        exp: 100,
    },
    {
        nome:'Mediano',
        moedas:5,
        exp: 300,
    },
    {
        nome:'Difícil',
        moedas:8,
        exp: 500,
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
