import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from './styles';

interface props {
    loading: boolean,
    size:'small' | 'large' | number,
    color:string,
}

const ListLoading = ({loading, size, color}:props) => {
    return <ActivityIndicator size={size} color={color} hidesWhenStopped={true} animating={loading} style={styles.activity} />;
};
export default ListLoading;
