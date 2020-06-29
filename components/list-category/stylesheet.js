import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
      marginTop:-10
  },
    listcategory: {
      marginTop:5,
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor: 'white',
    paddingTop:10,
    paddingBottom:10,
    elevation: 1,
    marginLeft:5,
    marginRight:5,
    borderRadius:10
  },
  item: {
    backgroundColor: 'white',
    padding: 5,
    flexDirection:'column',
    height:70,
    borderRadius:2,
    margin:4,
    flex:1,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,  
    borderRadius:10,
    elevation: 2,
  },
});
export default styles;