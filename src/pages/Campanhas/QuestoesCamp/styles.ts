import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerQuestao: {
    paddingHorizontal:0,
    marginHorizontal:0,
    maxHeight: 680,
    marginVertical:10,
    marginBottom:20,
  },
  scrollView: {
    marginHorizontal:0,
    paddingHorizontal:25,
  },
  imageView: {
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent:'center',
    padding:10,
  },
  progressBar: {
    height: 10,
  },
  listSecion:{
    borderWidth: 1,
  },
  listSubHeader: {
    fontWeight: '800',
    fontSize: 16,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius:30,
  },
  touchImage: {
    margin: 5,
  },
  text: {
    marginVertical:10,
  },
  dialogoContainer: {
    paddingTop: 10,
  },
  dialogoTitle: {
    textAlign: 'center',
  },
  dialogoContent: {
    alignItems: 'center',
  },
  imageDialogo: {
    width:62,
    height:62,
    alignSelf:'center',
  },
  actionContainerDialogo: {
    paddingBottom:30,
    justifyContent:'center',
  },
  buttonDialogo: {
    paddingHorizontal:15,
    flexDirection:'row-reverse',
  },
});
