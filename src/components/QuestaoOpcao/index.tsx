import React from 'react';
import {View} from 'react-native';

import {styles} from './styles';
import {RadioButton, useTheme} from 'react-native-paper';
import { Opcao } from '../../@types/questao';
import { AppTheme } from '../../@types/theme';

interface props {
  opcao: Opcao
}

const QuestaoOpcao = ({opcao}:props) => {

  const theme = useTheme<AppTheme>();

  return (
    <View
      style={[{borderColor: theme.colors.secondary}, styles.viewRadioButton]}>
      <RadioButton.Item
        label={opcao.texto}
        value={opcao.id.toString()}
        labelVariant="bodyMedium"
      />
    </View>
  );
};

export default QuestaoOpcao;
