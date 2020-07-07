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
    paddingTop:10,
    paddingBottom:10,
    marginLeft:5,
    marginRight:5,

  },
  item: {
    backgroundColor: 'white',
    padding: 5,
    flexDirection:'column',
    height:70,
    borderRadius:5,
    margin:4,
    flex:1,
    backgroundColor:'#abc4a5'
  },
});
export default styles;