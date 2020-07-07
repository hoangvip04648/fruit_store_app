import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    rowOne : {
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        backgroundColor:'white',
        padding:10,
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10,
        borderRadius:5
    },
    rowTwo :{
        marginLeft:10,
        marginRight:10,
        padding:10,
        marginBottom:10,
        borderRadius:5,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    rowThree :{
        backgroundColor:'white',marginBottom:10,marginLeft:10,marginRight:10,padding:10,borderRadius:10
    },
    rowFour : {
        flex:1,backgroundColor:'white',paddingLeft:10,marginLeft:10,marginRight:10,borderTopRightRadius:5,borderTopLeftRadius:5
    },
    rowFive : {
        flex:1,backgroundColor:'white',paddingLeft:20,flexDirection:'row',marginLeft:10,marginRight:10,marginBottom:10,borderBottomRightRadius:5,borderBottomLeftRadius:5
    }
})

export default styles;