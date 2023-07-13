import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {
  Text,
  Button,
  Avatar,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View} from 'react-native';
import {AppTheme} from '../../../types/theme';
import Select from '../../../components/Select';
import auth from '@react-native-firebase/auth';
import {findCep} from '../../../services/ApiEndereco';
import {createAluno, findCursosUnidade, findInstituicoes, findUnidadesByInst} from '../../../services/ApiCalango';
import SnackBar from '../../../components/SnackBar';
import { Instituicao } from '../../../types/instituicao';
import { CursosUnidade, Unidade } from '../../../types/cursos_unidade';
import { signIn } from '../../../redux/authSlice';
import { useAppDispatch } from '../../../types/reduxHooks';

const Cadastro = () => {

  const theme = useTheme<AppTheme>();
  const user = auth().currentUser;
  const dispatch = useAppDispatch();

  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [cursosUnidade, setCursosUnidade] = useState<CursosUnidade[]>([]);

  const [instituicao, setInstituicao] = useState(0);
  const [unidade, setUnidade] = useState(0);
  const [cep, setCep] = useState('');
  const [curso, setCurso] = useState(0);

  const [validacao, setValidacao] = useState(false);
  const [invalidCep, setInvalidCep] = useState(false);

  const [visible, setVisible] = useState(false);
  const [message, setMesage] = useState('');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const cepRegex = /^[0-9]{5}-[0-9]{3}$/;

  const validar = () => setValidacao(true);

  const verificaOpVazia = () => {
    return instituicao < 1 ||
      unidade < 1 ||
      cep == '' ||
      curso < 1
      ? true
      : false;
  };

  useEffect(() => {
    findInstituicoes().then(({data}) => setInstituicoes(data)).catch(response => {
      setMesage(response.message);
      onToggleSnackBar();
    });
  }, []);

  useEffect(() => {
    findUnidadesByInst(instituicao).then(({data}) => setUnidades(data)).catch(response => {
      setMesage(response.message);
      onToggleSnackBar();
    });
  }, [instituicao]);

  useEffect(() => {
    findCursosUnidade(unidade).then(({data}) => setCursosUnidade(data)).catch(response => {
      setMesage(response.message);
      onToggleSnackBar();
    });
  }, [unidade]);

  const handleSignUp = () => {
    verificaOpVazia() || invalidCep
      ? validar()
      : findCep(cep)
          .then(({data}) => {
            createAluno({ nome: user?.displayName!, email: user?.email!, fotoPerfil: user?.photoURL!,
              endereco: { cep: data.code, estado: data.state, cidade: data.city, bairro: data.district, rua: data.address},
              cursosUnidade: {id: curso},
            })
              .then(response => {
                console.log('Aluno criado: ', response.data);
                dispatch(signIn({ aluno: response.data }));
              })
              .catch(response => {
                setMesage(response.message.includes('400') ? 'Email já em uso' : response.message);
                onToggleSnackBar();
              });
          })
          .catch(response => {
            setMesage(response.message.includes('404') ? 'CEP Invalido!' : response.message);
            onToggleSnackBar();
          });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="none">
        <View style={styles.containerImage}>
          <Avatar.Image
            style={styles.image}
            size={120}
            source={
              user
                ? {
                    uri: user.photoURL,
                  }
                : require('../../../assets/avatar.png')
            }
          />
          <Text variant="titleMedium">Bem vindo(a)! {user?.displayName}</Text>
        </View>

        <View style={styles.viewCadastro}>
          <Text
            variant="labelLarge"
            style={[{color: theme.colors.secondary}, styles.cepTitle]}>
            CEP
          </Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            textColor={
              (cep == '' && validacao) || (cep != '' && invalidCep)
                ? theme.colors.error
                : theme.colors.outline
            }
            outlineStyle={[
              {
                borderRadius: theme.roundness,
                borderColor:
                  (cep == '' && validacao) || (cep != '' && invalidCep)
                    ? theme.colors.error
                    : theme.colors.elevation.level5,
              },
              styles.cepContainer,
            ]}
            placeholder="12345-678"
            value={cep}
            onChangeText={newValue => {
              cepRegex.test(newValue)
                ? setInvalidCep(false)
                : setInvalidCep(true);
              setCep(newValue);
            }}
          />
        </View>

        <Select
          arrayObject={instituicoes}
          onChange={newValue => setInstituicao(newValue)}
          titleLabel={'Instituição'}
          titleButton={'Escolha uma Opção...'}
          validacao={validacao}
        />

        <Select
          arrayObject={unidades}
          onChange={newValue => setUnidade(newValue)}
          titleLabel={'Unidade ou Polo'}
          titleButton={'Escolha uma Opção...'}
          validacao={validacao}
        />

        <Select
          arrayObject={cursosUnidade.map(cursoUni => {
            return {
              id: cursoUni.id,
              nome: `${cursoUni.curso?.nome} - ${cursoUni.modalidade}`,
            };
          })}
          onChange={newValue => {
            setCurso(newValue);
          }}
          titleLabel={'Curso | Modalidade'}
          titleButton={'Escolha uma Opção...'}
          validacao={validacao}
        />

        <Button
          style={styles.button}
          buttonColor={theme.colors.onBackground}
          mode="contained"
          onPress={handleSignUp}>
          Avançar
        </Button>
      </ScrollView>
      <SnackBar
        visible={visible}
        onDismissSnackBar={() => onDismissSnackBar()}
        duration={2000}
        message={message.includes('400') ? 'Email já em uso' : message}
      />
    </SafeAreaView>
  );
};

export default Cadastro;
