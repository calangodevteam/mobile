import React, { useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import User from '../pages/User';
import Ranking from '../pages/Ranking';
import HistoricoCamp from '../pages/Campanhas/HistoricoCamp';
import Notificacao from '../pages/Notificacao';
import { AppTheme } from '../types/theme';

const BottomRoutes = () => {

    const [index, setIndex] = useState(0);
    const theme = useTheme<AppTheme>();

    const [routes] = useState([
      { key: 'campanhas',title: 'Campanhas', focusedIcon: 'book-edit'},
      { key: 'ranking', title: 'Ranking', focusedIcon: 'podium'},
      { key: 'notificacao', title: 'Notificação', focusedIcon: 'bell'},
      { key: 'user', title: 'Usuário', focusedIcon: 'account'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
      campanhas: HistoricoCamp,
      ranking: Ranking,
      notificacao: Notificacao,
      user: User,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            activeColor={theme.colors.primary}
            inactiveColor={theme.colors.outline}
            onIndexChange={setIndex}
            renderScene={renderScene}
            labeled={false}
            theme={{colors: {secondaryContainer: 'transparent'}}}
            sceneAnimationEnabled={false}
        />
    );
};

export default BottomRoutes;
