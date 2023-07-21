import React from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import { styles } from './styles';

interface props {
    loading: boolean,
    size:'small' | 'large' | number,
    color:string,
}

const ListLoading = ({loading, size, color}:props) => {
    return (

        loading ? <ActivityIndicator size={size} color={color} style={styles.item}/> :
        <Text variant="bodySmall" style={[{color:color}, styles.item]}>Parece que Chegamos ao Fim...</Text>
    );
};
export default ListLoading;
