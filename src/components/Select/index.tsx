import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';

import {styles} from './styles';
import {
  Appbar,
  Button,
  Modal,
  Portal,
  RadioButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {AppTheme} from '../../@types/theme';

interface props {
  titleLabel: string;
  titleButton: string;
  arrayObject: any;
  onChange: (newValue: number) => void;
  validacao: boolean;
}

const Select = ({
  titleLabel,
  titleButton,
  arrayObject,
  onChange,
  validacao,
}: props) => {
  const theme = useTheme<AppTheme>();

  const [valueOption, setValueOption] = useState(0);
  const [textOption, setTextOption] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [checked, setChecked] = React.useState(0);

  useEffect(() => {
    onChange(valueOption);
  }, [valueOption]);

  const showDialog = () => setVisible(!visible);

  return (
    <>
      <View style={styles.container}>
        <Text
          variant="labelLarge"
          style={[styles.titleButton, {color: theme.colors.secondary}]}>
          {titleLabel}
        </Text>
        <Button
          icon="arrow-right"
          mode="elevated"
          buttonColor={theme.colors.background}
          textColor={
            valueOption < 1 && validacao
              ? theme.colors.error
              : theme.colors.outline
          }
          contentStyle={styles.buttonEsc}
          style={{
            borderRadius: theme.roundness,
            borderColor: theme.colors.elevation.level5,
          }}
          onPress={() => showDialog()}>
          {valueOption < 1 ? titleButton : textOption}
        </Button>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={showDialog}
          contentContainerStyle={[
            {backgroundColor: theme.colors.background},
            styles.dialogoContainer,
          ]}>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                showDialog();
              }}
            />
            <Appbar.Content title={titleLabel} />
          </Appbar.Header>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="none">
            {arrayObject.map((item: any) => (
              <View
                key={item.id.toString()}
                style={[
                  {borderColor: theme.colors.elevation.level5},
                  styles.radioButton,
                ]}
              >
                <RadioButton.Item
                  mode="ios"

                  label={item.nome ?? ''}
                  color={theme.colors.success}
                  labelStyle={{color: theme.colors.secondary}}
                  value={item.id.toString()}
                  status={checked == item.id ? 'checked' : 'unchecked'}
                  onPress={() => {
                    showDialog();
                    setValueOption(item.id);
                    setTextOption(item.nome ?? item.curso.nome);
                    setChecked(item.id);
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
};

export default Select;
