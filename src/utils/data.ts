import { CursosUnidade, Unidade } from '../@types/cursos_unidade';
import { Instituicao } from '../@types/instituicao';
import { Questionario, Resposta } from '../@types/questionario';
import { Modalidade } from '../@types/enums';
export interface Aluno{
  id: number,
  nome: string,
  instituicao: string,
  unidade: string,
  cep: string,
  curso: string,
  modelo: string,
  estrelas:number,
  level:number,
  exp:number,
  nextLevel:number,
}

export const UsuariosImpl = [
    {
        id: 1,
        nome: 'Jorge Souza',
        instituicao: 'UERJ',
        unidade: 'UERJ-ZO',
        cep: '23071160',
        curso: 'TADS',
        modelo: 'Presencial',
        estrelas:200,
        level:1,
        exp:300,
        nextLevel:500,
    },
    {
        id: 2,
        nome: 'Aline Fernandes',
        instituicao: 'UERJ',
        unidade: 'UERJ-ZO',
        cep: '23071160',
        curso: 'Farmácia',
        modelo: 'Presencial',
        estrelas:120,
        level:3,
        exp:1050,
        nextLevel:1125,
    },
    {
        id: 3,
        nome: 'Emanoel Rosa',
        instituicao: 'UERJ',
        unidade: 'UERJ-ZO',
        cep: '23071160',
        curso: 'Ciência da Computação',
        modelo: 'Presencial',
        estrelas:200,
        level:3,
        exp:750,
        nextLevel:1125,
    },
    {
        id: 4,
        nome: 'Vera Silva',
        instituicao: 'UERJ',
        unidade: 'UERJ-ZO',
        cep: '23071160',
        curso: 'TADS',
        modelo: 'Presencial',
        estrelas:205,
        level:2,
        exp:600,
        nextLevel:750,
    },
];

export const QuestionarioImpl:Questionario[] = [
    {
      id: 1,
      titulo: 'Prova de Programação',
      qtdQuestoes: 2,
      tempoDuracao: 60,
      tempoDisponivel: 600,
      dificuldade: 'Mediano',
      temasAreas: {
        id: 13,
        tema: {id: 5, nome: 'Algoritmos e Estrutura de Dados'},
        areaConhecimento: {
          id: 466,
          nome: 'Linguagens de Programação',
          areaConhecimentoPai: {
            id: 94,
            nome: 'Metodologia e Técnicas da Computação',
            areaConhecimentoPai: {
              id: 11,
              nome: 'Ciência da Computação',
              areaConhecimentoPai: {
                id: 1,
                nome: 'Ciências Exatas e da Terra',
                areaConhecimentoPai: null,
              },
            },
          },
        },
      },
      questoes: [
        {
          id: 51,
          texto: 'O que faz o algoritmo XYZ?',
          categoriaBloom: 'Aplicação',
          artigos: [
            {
              id: 3,
              url: 'https://www.linkedin.com/in/leandro-rocha-musser-carneiro/',
              titulo: 'Técnicas de Criação de Questões Aleatórias',
              conteudo:`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. \n
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
              dataPublicacao: '2023-05-14T00:00:00.000+00:00',
              autor: ['Leandro Musser', 'Jhony'],
            },
          ],
          figuras: [
            {
              id: 1,
              atributo: 'https:\\/\\/iili.io\\/HUkgmw7.png',
              descricao: 'Foto Leandro Musser',
            },
            {
              id: 2,
              atributo: 'https:\\/\\/iili.io\\/HUkgmw7.png',
              descricao: 'Foto Leandro Musser',
            }],
          opcoes: [
            {id: 117, texto: 'Aqui vai uma resposta que eu não sei qual é em algum momento'},
            {id: 118, texto: 'Opção aleatória'},
            {id: 119, texto: 'Tudo'},
            {id: 120, texto: 'Teste'},
          ],
          opcaoCorreta: {id: 118, texto: 'Opção aleatória'},
          temasAreas: {
            id: 13,
          },
        },
        {
          id: 52,
          texto:
            'Diga qual vai ser o valor de a no final da execução.\n\nint a = 1;\na++;',
          categoriaBloom: 'Analise',
          artigos: [
            {
              id: 3,
              url: 'https://www.linkedin.com/in/leandro-rocha-musser-carneiro/',
              titulo: 'Aleatório',
              conteudo:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
              dataPublicacao: '2023-05-14T00:00:00.000+00:00',
              autor: ['Leandro Musser', 'Jhony'],
            },
          ],
          figuras: [],
          opcoes: [
            {id: 121, texto: '1'},
            {id: 122, texto: 'Óbvio que é 2'},
            {id: 123, texto: '3'},
            {id: 124, texto: '4'},
          ],
          opcaoCorreta: {id: 122, texto: 'Óbvio que é 2'},
          temasAreas: {
            id: 9,
          },
        },
      ],
      dataCriacao:'2023-05-14T00:00:00.000+00:00',
    },
    {
      id: 2,
      titulo: 'Prova de Teste',
      qtdQuestoes: 6,
      tempoDuracao: 99,
      tempoDisponivel: 999,
      dificuldade: 'Difícil',
      temasAreas: {
        id: 11,
        tema: {id: 3, nome: 'Python'},
        areaConhecimento: {
          id: 466,
          nome: 'Linguagens de Programação',
          areaConhecimentoPai: {
            id: 94,
            nome: 'Metodologia e Técnicas da Computação',
            areaConhecimentoPai: {
              id: 11,
              nome: 'Ciência da Computação',
              areaConhecimentoPai: {
                id: 1,
                nome: 'Ciências Exatas e da Terra',
                areaConhecimentoPai: null,
              },
            },
          },
        },
      },
      questoes: [
        {
          id: 53,
          texto:
            'Usando Python, calcule a quantidade de Pixels na seguinte imagem',
          categoriaBloom: 'Aplicação',
          artigos: [],
          figuras: [
            {
              id: 1,
              atributo: 'https:\\/\\/iili.io\\/HUkgmw7.png',
              descricao: 'Foto Leandro Musser',
            },
          ],
          opcoes: [
            {id: 125, texto: '128'},
            {id: 126, texto: '256'},
            {id: 127, texto: '1023'},
            {id: 128, texto: '49501'},
          ],
          opcaoCorreta: {id: 128, texto: '49501'},
          temasAreas: {
            id: 11,
          },
        },
        {
          id: 54,
          texto: 'Qual o foco apresentado no artigo?',
          categoriaBloom: 'Analise',
          artigos: [
            {
              id: 3,
              url: 'https://www.linkedin.com/in/leandro-rocha-musser-carneiro/',
              titulo: 'Técnicas de Criação de Questões Aleatórias',
              conteudo:`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. \n
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
              dataPublicacao: '2023-05-14T00:00:00.000+00:00',
              autor: ['Leandro Musser'],
            },
          ],
          figuras: [],
          opcoes: [
            {id: 129, texto: 'Teste'},
            {id: 130, texto: 'Random'},
            {id: 131, texto: 'Abc'},
            {id: 132, texto: 'Olá, mundo!'},
          ],
          opcaoCorreta: {id: 132, texto: 'Olá, mundo!'},
          temasAreas: {
            id: 10,
          },
        },
        {
          id: 12,
          texto:
            'Quanto é 1+1',
          categoriaBloom: 'Aplicação',
          artigos: [],
          figuras: [],
          opcoes: [
            {id: 225, texto: '2'},
            {id: 226, texto: '4'},
            {id: 227, texto: '3'},
            {id: 228, texto: '7'},
          ],
          opcaoCorreta: {id: 225, texto: '2'},
          temasAreas: {
            id: 11,
          },
        },
        {
          id: 22,
          texto:
            'O que é uma vaca',
          categoriaBloom: 'Aplicação',
          artigos: [],
          figuras: [],
          opcoes: [
            {id: 325, texto: 'um tipo de vegetal'},
            {id: 326, texto: 'uma planta comestível'},
            {id: 327, texto: 'um animal'},
            {id: 328, texto: 'um animal invertebrado'},
          ],
          opcaoCorreta: {id: 327, texto: 'um animal'},
          temasAreas: {
            id: 11,
          },
        },
        {
          id: 82,
          texto:
            'quantas folhas tem um trevo?',
          categoriaBloom: 'Aplicação',
          artigos: [],
          figuras: [],
          opcoes: [
            {id: 325, texto: '4'},
            {id: 326, texto: '2'},
            {id: 327, texto: '3'},
            {id: 328, texto: '1'},
          ],
          opcaoCorreta: {id: 327, texto: '3'},
          temasAreas: {
            id: 11,
          },
        },
        {
          id: 82,
          texto:
            'Qual a resposta está correta?',
          categoriaBloom: 'Aplicação',
          artigos: [],
          figuras: [],
          opcoes: [
            {id: 425, texto: '1+1 é 3'},
            {id: 426, texto: '1 x 1! é 1'},
            {id: 427, texto: '2/1 é 4'},
            {id: 428, texto: 'A terra é quadrada'},
          ],
          opcaoCorreta: {id: 426, texto: '1 x 1! é 1'},
          temasAreas: {
            id: 11,
          },
        },
      ],
      dataCriacao:'2023-05-14T00:00:00.000+00:00',
    },
  ];

export const respostaImpl: Resposta[] = [
  {
      alunoId: 1,
      questionario: QuestionarioImpl[0],
      qtd_acertos: 1,
      data_respondido: new Date().toString(),
  },
  {
    alunoId: 1,
    questionario: QuestionarioImpl[1],
    qtd_acertos: 4,
    data_respondido: new Date().toString(),
},
];

export const instituicaImpl: Instituicao[] = [
  {
      id: 1,
      nome:'Uerj',
      cnpj:'0000',
  },
  {
    id: 2,
    nome:'Estácio',
    cnpj:'0000',
  },
];

export const unidadeImpl: Unidade[] = [
  {
      id: 1,
      nome:'Uerj-ZO',
      instituicao: instituicaImpl[1],
  },
  {
    id: 2,
    nome:'Uerj-Maracanã',
    instituicao: instituicaImpl[1],
  },
  {
    id: 3,
    nome:'Estácio-WestShopping',
    instituicao: instituicaImpl[2],
  },
];

export const cursoImpl: CursosUnidade[] = [
  {
      id: 1,
      modalidade: Modalidade.Presencial,
      curso: {
        id:1,
        nome:'Tecnologia em Analise e Desenvolvimento de Sistemas',
      },
      unidade: unidadeImpl[1],
  },
  {
    id: 2,
    modalidade: Modalidade.Presencial,
    curso: {
      id:2,
      nome:'Ciência da Computação',
    },
    unidade: unidadeImpl[1],
  },
  {
    id: 3,
    modalidade: Modalidade.Presencial,
    curso: {
      id:3,
      nome:'Farmácia',
    },
    unidade: unidadeImpl[1],
  },
];
