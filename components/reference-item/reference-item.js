import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import {rootUrl} from '../../config'

export default function ReferenceItem(props){
    const [reference,setReference]=useState(props.reference);
    
    useEffect(()=>{
       
        setReference(props.reference)
       
    },[props.reference])
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: `${rootUrl}/${reference.image[0]}`}} style={styles.image}/>
            </View> 
            <View style={styles.productInformationContainer}>
                <View style={styles.productInformation}>
                    <Text style={styles.headerInformation}>{reference.title}</Text>
                    <Text>{reference.description}</Text>
                </View>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        height:120,
        flexDirection:"row",
        shadowColor: '#000',
        borderWidth:0.1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
        borderRadius:10,
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,1)'
    },
    imageContainer:{
        height:110,
        flex:1,
        padding:10,
    },
    productInformationContainer:{
        flex:3,
        paddingLeft:10,
        paddingRight:13,
        paddingTop:10,
    },
    image:{
        height:"100%",
        borderRadius:5,
        resizeMode:'contain'
    },
    productInformation:{
        flexDirection:"column",
        justifyContent:"flex-start",
        paddingBottom:10
    },
    headerInformation:{
        fontSize:17,
        fontFamily:"a",
        fontWeight:"bold"
    },
    producerInformation:{
        fontSize:14,
        color:"#6c757d"
    },
    locationInformation:{
        paddingTop:10  
    }
})