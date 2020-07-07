import {StyleSheet} from 'react-native'
import { Right } from 'native-base'

export const styles = StyleSheet.create({
    productInformationContainer:{
        flexDirection:"row",
        alignItems:"stretch",
        justifyContent:"space-between",
        display:"flex",
        marginTop:10
    },
    productInformation:{
        alignSelf:"center",
        flex:1
    },
    productInformationColumnLeft:{
        fontSize:15,
        fontWeight:"normal",
        alignSelf:"flex-start",
        marginLeft:30,
    },
    productInformationColumnRight:{
        fontSize:15,
        fontWeight:"bold",
        alignSelf:"flex-start",
        marginLeft:20
        
    },
    container:{
        flex:1,
        marginTop:0,
        backgroundColor:"white"
    },
    productImg:{
        width:200,
        height:200,
    },
    name:{
        marginTop:10,
        fontSize:25,
        color:"#696969",
        fontWeight:'bold'
    },
    price:{
        marginTop:10,
        fontSize:18,
        color:"green",
        fontWeight:'bold'
    },
    description:{
        textAlign:'center',
        marginTop:10,
        color:"#696969",
        fontSize:15
    },
    star:{
        width:40,
        height:40,
    },

    btnSize: {
        height:40,
        width:40,
        borderRadius:40,
        borderColor:'#778899',
        borderWidth:2,
        marginHorizontal:3,
        backgroundColor:'#00BFFF',
        borderColor:'#00BFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starContainer:{
        marginTop:5,
        justifyContent:'center', 
        marginHorizontal:30, 
        flexDirection:'row', 
        marginBottom:10,
    },
    contentSize:{ 
        justifyContent:'center', 
        marginHorizontal:30, 
        flexDirection:'row', 
        marginTop:15,
        alignItems:'center'
    },
    separator:{
        height:2,
        backgroundColor:"#eeeeee",
        marginTop:5,
        marginHorizontal:30
    },
    shareButton: {
        marginTop:15,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
    AddButtonText:{
        color: "#FFFFFF",
        fontSize:18,
        fontWeight:'bold'
    },
    addToCarContainer:{
        marginHorizontal:80
    },
    commentContainer:{
      
    },
    increase:{
      

        height:40,
        width:40,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderColor:'#778899',
        borderWidth:2,
        marginHorizontal:3,
        backgroundColor:'#00BFFF',
        borderColor:'#00BFFF',
        justifyContent:"center",
        alignItems:"center",
        marginLeft:0,
        marginRight:100
    },
    reduction:{
        height:40,
        width:40,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderColor:'#778899',
        borderWidth:2,
        marginHorizontal:3,
        backgroundColor:'#00BFFF',
        borderColor:'#00BFFF',
        justifyContent:"center",
        alignItems:"center",
        marginRight:0,
        marginLeft:100
    },
    inputNumberItem:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#ccc',
        height:40,
        width:70,
        textAlign:"center",
        color:'black'
    }
}); 