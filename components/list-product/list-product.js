import React,{useState,useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import ProductItem from '../product-item/product-item'
import {styles} from './stylesheet'
export default function ListProduct(props){ 
    const [products,setProduct]=useState(props.ListProduct);
    useEffect(()=>{
        setProduct(props.ListProduct);
       
    },[props.ListProduct]);
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Danh sách sản phẩm</Text>
            </View>
            
                <View>
                    {
                        products.map((product,index)=>(
                            <TouchableOpacity onPress={() =>{props.navigation.navigate('ProductDetail',{product:product})}}>
                                <View style={styles.productItemContainer}>
                                    <ProductItem key={index} navigation={props.navigation} key={index} product={product}/> 
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
        
        </View>
    );
}

