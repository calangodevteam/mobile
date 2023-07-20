import React from 'react';
import {Modal, Portal, Text, useTheme} from 'react-native-paper';
import { styles } from './styles';
import { Resultado } from '../../types/questionario';
import { difference, isValid } from '../../utils/Date';
import { AppTheme } from '../../types/theme';

interface props {
  visible: boolean;
  resultado?: Resultado
  onClose: () => void;
}

const ModalResultado = ({visible,resultado, onClose}: props) => {
    const theme = useTheme<AppTheme>();
    const tempoProva = difference(resultado?.inicio!, resultado?.termino!);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[{backgroundColor: theme.colors.background}, styles.container]}
    >
        <Text variant="headlineMedium" style={styles.title}>{resultado?.questionario.titulo}</Text>
        <Text variant="titleMedium" style={styles.text}>{`Acertos: ${resultado?.acertos} / ${resultado?.questionario.qtdQuestoes}`}</Text>
        <Text variant="titleMedium" style={styles.text}>{`Dificuldade: ${resultado?.questionario.dificuldade}`}</Text>
        <Text variant="titleMedium" style={styles.text}>
          {`Tempo Gasto: ${parseFloat(tempoProva) < 1 ?
             tempoProva.substring(tempoProva.indexOf('.') + 1) + 's' :
              tempoProva + 'm'
            }`
          }
        </Text>
        <Text variant="titleMedium"  style={{
            color: isValid(resultado?.questionario.dataCriacao!, resultado?.questionario.tempoDuracao!) === true ?
              theme.colors.success : theme.colors.errorLight,
            }}
          >
          {`Status: ${isValid(resultado?.questionario.dataCriacao!, resultado?.questionario.tempoDuracao!) === true ? ' Ativa' : ' Encerrada'}`}
        </Text>
      </Modal>
    </Portal>
  );
};

export default ModalResultado;
