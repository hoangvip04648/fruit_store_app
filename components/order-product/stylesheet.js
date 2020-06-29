import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
        container: {
        flex:1,
      },
      wrapImage :{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      image :{
        resizeMode: 'contain',
        borderColor:'black',
        borderWidth: 1, 
        width:'90%',
        height:'90%'
        
      }
});

export default styles;