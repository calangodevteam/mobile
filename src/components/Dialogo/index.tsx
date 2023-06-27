import React from 'react';
import { styles } from './styles';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface props {
    visible:boolean,
    showDialog: () => void,
    ok: () => void,
    confirmTitle?: string,
    cancel?: () => void,
    title: string,
    content?: string,
    icon?:string
}

const Dialogo = ({visible, showDialog, ok, confirmTitle, cancel, title, content, icon}: props) => {
  return (
    <Portal>
    <Dialog visible={visible} onDismiss={showDialog} style={styles.container}>
      {icon ? (<Dialog.Icon icon={icon} />) : null}
      <Dialog.Title style={styles.title}>{title}</Dialog.Title>
      {content ? (
        <Dialog.Content>
            <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
      ) : null}
      <Dialog.Actions>
          {cancel ? (<Button mode="contained" style={styles.button} onPress={cancel}>Cancelar</Button>) : null}
          <Button mode="contained" style={styles.button} onPress={ok}>{confirmTitle ? confirmTitle : 'Confirmar'}</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
  );
};

export default Dialogo;
