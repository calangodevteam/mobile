import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { Avatar, Badge, Button, ProgressBar, Text, useTheme } from 'react-native-paper';
import { AppTheme } from '../../@types/theme';

const UsuLevelCard = () => {
  const theme = useTheme<AppTheme>();
  return (
    <View style={styles.container}>
        <Text>Usu card</Text>
        <Text>Usu card</Text>
        <Badge size={35}>3</Badge>
        
        <View style={{flexDirection:'row', width:280, marginTop:40,padding:0}}>
          <ProgressBar animatedValue={0.8} color={theme.colors.scoreColor} style={{width:260, height: 25, marginLeft:10, marginTop:1}}/>
          <Badge size={32} style={{backgroundColor:theme.colors.scoreColor, position: 'absolute', left: 0, alignSelf:'center'}}>3</Badge>
          <Button icon="star" labelStyle={{color:'#000000'}} mode="text" disabled style={{position: 'absolute', left:90, alignSelf:'center'}}>500/600</Button>
          <Badge size={32} style={{backgroundColor:theme.colors.scoreColor, position: 'absolute', right: 0, alignSelf:'center'}}>3</Badge>
        </View>
        
    </View>
  );
}

export default UsuLevelCard;