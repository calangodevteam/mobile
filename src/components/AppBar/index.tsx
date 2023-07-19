import React, {useState} from 'react';
import {Appbar, Menu} from 'react-native-paper';

interface itemMenu {
  id: number,
  title: string;
  action: () => any;
}

interface props {
  title: string;
  goBack?: () => void;
  dots?:itemMenu[];
}

const AppBar = ({title, dots, goBack}: props) => {

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header elevated>
      {goBack ? <Appbar.BackAction onPress={goBack} /> : null}
      <Appbar.Content title={title} />
      {dots ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
          anchorPosition="bottom">
          {dots.map((item) => (
            <>
            <Menu.Item key={item.id} title={item.title} onPress={item.action} />
            </>
          ))}
        </Menu>
      ) : null}
    </Appbar.Header>
  );
};

export default AppBar;
