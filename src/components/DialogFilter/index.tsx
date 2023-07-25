import React from 'react';
import {styles} from './styles';
import {
  Button,
  Checkbox,
  CheckboxItemProps,
  Dialog,
  Portal,
  RadioButton,
} from 'react-native-paper';
import {ScrollView, View} from 'react-native';

export interface checkBoxInterface {
  title: string;
  checked: CheckboxItemProps['status'];
  orientation: 'asc' | 'desc';
}

interface props {
  visible: boolean;
  showDialog: () => void;
  ok: () => void;
  updateCheck: (index: number, checked: CheckboxItemProps['status']) => void;
  updateRadio: (
    index: number,
    checked: checkBoxInterface['orientation'],
  ) => void;
  title: string;
  content: checkBoxInterface[];
}

const DialogFilter = ({
  visible,
  showDialog,
  ok,
  updateCheck,
  updateRadio,
  title,
  content,
}: props) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={showDialog} style={styles.container} dismissable={false} dismissableBackButton={false}>
        <Dialog.Title>{`Filtrar ${title}`}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={styles.scroll}>
            {content?.map((check, index) => (
              <View
                key={check.title}
                style={styles.viewContainer}
              >
                <Checkbox.Item
                  key={check.title}
                  label={check.title}
                  labelVariant="titleMedium"
                  status={check.checked}
                  onPress={() =>
                    updateCheck(
                      index,
                      check.checked === 'checked' ? 'unchecked' : 'checked',
                    )
                  }
                />

                <RadioButton.Group
                  onValueChange={value =>
                    updateRadio(index, value === 'asc' ? 'asc' : 'desc')
                  }
                  value={check.orientation}>
                  <View style={styles.viewRadio}>
                    <RadioButton.Item labelVariant="bodySmall" label="Crescente" value="asc" disabled={check.checked !== 'checked'}/>
                    <RadioButton.Item labelVariant="bodySmall" label="Decrescente" value="desc" disabled={check.checked !== 'checked'} />
                  </View>
                </RadioButton.Group>
              </View>
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => {ok(); showDialog();}}>Aplicar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogFilter;
