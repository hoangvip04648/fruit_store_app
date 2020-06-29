import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({  
    container:{
      flex : 1,
    },
    title :{
    //  flex:1,
    //  width : "100%",
    //  resizeMode : 'contain',
    //  alignSelf : "center"
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    color:'white',
    
   },
   texttitle :{
     marginTop:130,
    fontSize:28,
    textAlign:'center',
    fontWeight:'bold',
    color:'white'
  },
   form:{
    flex:2,
   }, 
   input:{
      width:'100%',
      height: 40,
      backgroundColor: 'white',
      marginBottom: 10,
      padding: 10,
      color: 'black',
      justifyContent:'center',
      borderRadius:10
   },
   password :{
    width:'100%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    color: 'black',
    justifyContent:'center',
    borderRadius:10
   }
  });