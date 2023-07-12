import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: '50%',
    right: '50%',
    
  },
  button: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    height: 45,
  },
  containerImage: {
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 40,
  },
  image: {
    marginBottom: 8,
  },
  scrollView: {
    marginHorizontal: 0,
    paddingHorizontal: 40,
  }
});
