import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import {rootUrl} from '../../config';
export default function ProductItem(props){
    const [productInformation,setProduct]=useState(props.product);
    useEffect(()=>{
        setProduct(props.product);
    },[props.product])
    const ratingCompleted=(rate)=>{
        console.log(rate);
    }

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: `${rootUrl}/product-image/${productInformation.image[0]}`}} style={styles.image}/>
            </View> 
            <View style={styles.productInformationContainer}>
                <View style={styles.productInformation}>
                    <Text style={styles.headerInformation}>{productInformation.name}</Text>
                    <View style={{alignSelf:"flex-start",paddingTop:7}}>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={17}
                            defaultRating={0}
                            showRating={false}
                            readonly ={true}
                            startingValue={productInformation.rate}
                            
                        />
                    </View>
                    <Text style={styles.locationInformation}>{productInformation.price}đ/kg</Text>
                </View>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        height:100,
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
        padding:10
    },
    productInformationContainer:{
        flex:3,
        paddingLeft:10,
        paddingRight:13,
        paddingTop:10
    },
    image:{
        height:"100%",
        borderRadius:5,
        resizeMode:'contain'
    },
    productInformation:{
        height:"100%",
        flexDirection:"column",
        justifyContent:"flex-start"
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
        paddingTop:18
    }
})