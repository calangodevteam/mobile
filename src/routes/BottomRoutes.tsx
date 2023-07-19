import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import User from '../pages/User';
import Ranking from '../pages/Ranking';
import HistoricoCamp from '../pages/Campanhas/HistoricoCamp';
import Notificacao from '../pages/Notificacao';

const BottomRoutes = () => {

    const [index, setIndex] = useState(0);

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
            onIndexChange={setIndex}
            renderScene={renderScene}
            labeled={false}
            theme={{colors: {secondaryContainer: 'transparent'}}}
        />
    );
};

export default BottomRoutes;
