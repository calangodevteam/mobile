import React from 'react';
import {Linking} from 'react-native';

import {styles} from './styles';
import {List} from 'react-native-paper';
import {Artigo} from '../../@types/questao';

interface props {
  artigo: Artigo;
}

const iconCalendar = () => <List.Icon icon="calendar-month" />;
const iconSearch = () => <List.Icon icon="search-web" />;
const iconBook = () => <List.Icon icon="book-edit" />;

const QuestaoArtigo = ({artigo}: props) => {

  const handlePress = (url: string) => {
    Linking.openURL(url).catch(error => console.log(error));
  };

  return (
    <List.Accordion
      key={`artigo${artigo.id}`}
      title={artigo.titulo}
      id={`artigo${artigo.id}`}>
      <List.Item
        title={artigo.titulo}
        titleStyle={styles.textList}
        titleNumberOfLines={5}
        description={artigo.conteudo}
        descriptionStyle={styles.textList}
        descriptionNumberOfLines={500}
      />
      <List.Item
        title={artigo.dataPublicacao}
        left={iconCalendar}
        style={styles.itemList}
      />
      <List.Item
        title={artigo.url}
        titleNumberOfLines={5}
        left={iconSearch}
        style={styles.itemList}
        onPress={() => handlePress(artigo.url)}
      />
      <List.Item
        title={artigo.autor.join(', ')}
        left={iconBook}
        style={styles.itemList}
      />
    </List.Accordion>
  );
};

export default QuestaoArtigo;
