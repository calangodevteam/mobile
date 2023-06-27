import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardContainer: {
    height: 410,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:30,
    marginBottom:10,
  },
  CardDireitoContainer: {
    width:'55%',
    height:'80%',
    alignItems: 'center',
    justifyContent:'center',
    paddingTop:30,
  },
  cardEsquerdoContainer: {
    width:'45%',
    height:'80%',
    alignItems: 'flex-end',
    paddingRight:25,
  },
  cardInferiorContainer: {
    width:'100%',
    height:'20%',
  },
  viewPoints: {
    flexDirection:'row',
    marginBottom:10,
  },
  animated: {
    marginVertical: 25,
  },
  textViewPoint: {
    margin:7,
  },
  imageIcon: {
    width:32,
    height:32,
  },
  textRespErradas: {
    marginTop: 40,
  },
  textRespCerta: {
    marginTop: 15,
  },
  buttonBack: {
    marginRight: 20,
  },
  fontBold: {
    fontWeight: '900',
  },
});
