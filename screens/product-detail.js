    import React, { Component,useState,useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
    } from 'react-native';
import Menu from '../components/menu/Menu';
import {Slider} from '../components/carousel/carousel';
import ListProduct from '../components/list-product/list-product';
import ProductInformation from '../components/product-detail/product-detail';

function ProductDetail(props) {
    const { navigation } = props;
   const [product,setProduct]=useState(navigation.getParam('product'));
    return (
        <View style={{flex:1,flexDirection:"column",display:"flex"}}>
        
            <View>
                <Menu navigation={props.navigation} title={product.name} isBack={true}/>
            </View>
            <ScrollView style={{backgroundColor:'#ECF3FF'}}>
                <View style={{flex:1}}>
                    <Slider images={product.image} navigation={props.navigation} title="productDetail"/>
                </View>
                <View style={{flex:3}}>
                    <ProductInformation productInformation={product} navigation={props.navigation} />
                </View>
            </ScrollView>
        </View>
    )
}

ProductDetail.navigationOptions = props => ({
    title: props.navigation.getParam('product').name,
});
    
export default ProductDetail