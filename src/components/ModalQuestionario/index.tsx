import React from 'react';
import {Badge, Button, Modal, Portal, Text, useTheme} from 'react-native-paper';
import { styles } from './styles';

interface props {
  visible: boolean;
  titulo:string
  dificuldade: string,
  qtdQuestoes: number,
  onClose: () => void;
  navigate: () => void;
}

const ModalQuestionario = ({visible,titulo, dificuldade, qtdQuestoes, onClose, navigate}: props) => {
    const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[{backgroundColor: theme.colors.background},styles.container]}
    >
        <Text variant="titleLarge" style={styles.text}>{titulo}</Text>
        <Text variant="bodyLarge" style={styles.text}>Dificuldade: {dificuldade}</Text>
        <Text variant="bodyMedium" style={styles.text}>Questões</Text>
        <Badge style={[{backgroundColor: theme.colors.tertiaryContainer}, styles.view]} size={155}>{qtdQuestoes}</Badge>
        <Button
          mode="elevated"
          icon="arrow-right-thin"
          contentStyle={styles.contentModal}
          labelStyle={{color: theme.colors.onBackground}}
          style={styles.button}
          onPress={navigate}
        >
          Começar
        </Button>
      </Modal>
    </Portal>
  );
};

export default ModalQuestionario;
