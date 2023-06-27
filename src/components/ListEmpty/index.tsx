import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';

interface props {
  title: string;
  subTitle?: string;
  icon?: {
    name: string;
    size: number;
    color: string;
  };
}

const ListEmpty = ({title, subTitle, icon}: props) => {
  return (
    <View style={styles.container}>
      {icon ?
        <MaterialCommunityIcons
          name={icon.name}
          size={icon.size}
          color={icon.color}
        /> : null }
      <Text variant="titleMedium">{title}</Text>
      {subTitle ? <Text variant="bodyLarge">{subTitle}</Text> : null}
    </View>
  );
};

export default ListEmpty;
