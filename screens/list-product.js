import React,{useState,useEffect} from 'react';
import {View,Text,ScrollView}  from 'react-native';
import {Spinner} from 'native-base'
import ListProduct from '../components/list-product/list-product';
import {rootUrl} from '../config'
import axios from 'axios';
import Menu from '../components/menu/Menu'
export const listProductScreen = (props) => {
    const [idCategory,setIdCategory] = useState(props.navigation.getParam('category').idCategory)
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        axios.get(`${rootUrl}/san-pham?idCategory=${idCategory}`)
        .then(res => {
            setProducts(res.data.products);
        })
        .catch(err => {
            console.log(err);
        })
    },[]) ;

    const screen =  <ScrollView style={{backgroundColor:'#ECF3FF',flex:1}}>
                        <Menu navigation={props.navigation} isBack={true} title={props.navigation.getParam('category').name}/>
                        <ListProduct ListProduct={products} navigation={props.navigation} />
                    </ScrollView>
    return (
            <View style={{flex:1,flexDirection:'column'}}>
                {products.length == 0 ?<View style={{flex:1,alignSelf:'center',alignItems:'center',justifyContent:'center'}}><Spinner /></View> : screen}
           </View>
    )
}
listProductScreen.navigationOptions = props => ({
    title: props.navigation.getParam('category').name
});
