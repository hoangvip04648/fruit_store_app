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
        borderRadius:5,
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
        backgroundColor:'white',marginBottom:5,marginLeft:10,marginRight:10,padding:10,borderRadius:10
    },
    rowFour : {
        flex:1,backgroundColor:'white',paddingLeft:20,marginLeft:10,marginRight:10,borderTopRightRadius:5,borderTopLeftRadius:5,marginBottom:5,paddingBottom:10,paddingTop:10
    },
    rowFive : {
        flex:1,backgroundColor:'white',paddingLeft:20,flexDirection:'row',marginLeft:10,marginRight:10,borderBottomRightRadius:5,borderBottomLeftRadius:5,marginBottom: 60
    },
    rowSix : {
        position: 'absolute',
        flex:1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    }
})

export default styles;