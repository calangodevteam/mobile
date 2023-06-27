import React from 'react';
import {Snackbar} from 'react-native-paper';

interface props {
  visible: boolean;
  onDismissSnackBar: () => void;
  message: string;
  duration: number;
}

const SnackBar = ({visible, onDismissSnackBar, message, duration}: props) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => onDismissSnackBar()}
      duration={duration ? duration : 2000}
      action={{
        label: 'Confirmar',
        onPress: () => {
          onDismissSnackBar();
        },
      }}>
      {message}
    </Snackbar>
  );
};

export default SnackBar;
