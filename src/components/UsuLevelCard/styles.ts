import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical:20,
    paddingHorizontal:20,
    paddingVertical:20,
    borderWidth:2,
    borderRadius:20,
  },
  viewProgress: {
    flexDirection:'row',
    width:300,
    marginTop:10,
    padding:0,
  },
  progressBar: {
    width:280,
    height: 25,
    marginLeft:10,
    marginTop:1,
  },
  badgedProgressLeft: {
    position: 'absolute',
    left: 0,
    alignSelf:'center',
  },
  badgedProgressRight: {
    position: 'absolute',
    right: 0,
    alignSelf:'center',
  },
  textProgress : {
    position: 'absolute',
    left:90,
    alignSelf:'center',
  },
  viewNivel: {
    flexDirection:'row',
  },
  badgeNivel: {
    alignSelf:'flex-start',
    marginRight:10,
},
});
