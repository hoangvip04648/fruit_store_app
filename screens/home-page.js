import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {rootUrl} from '../config';
import {
  View,
  ScrollView,
} from 'react-native';

import Menu from '../components/menu/Menu';
import {Slider} from '../components/carousel/carousel';
import ListProduct from '../components/list-product/list-product';
import ListReference from '../components/list-reference/list-reference'
import ListCategory from '../components/list-category/list-category';
import  useGlobal from '../store';

export default function Home(props) {
    const [globalState,globalAction] =  useGlobal();
    const [references,setReferences]=useState([]);
    const [category, setCategory]  = useState([]);
    const [slideImage,setSlideImage]=useState(
        [
            "0AIMqh9jJmeA5dbkRSfZ.jpg",
            "zvswRzgRsSvpcgGbrKaU.jpg",
            "yL5pjzzMNixDJIyZ4x6d.jpg",
            "J4sCoUqxG9YTvE8vqF7o.jpg"                               
        ]
                            );
    useEffect(()=>{
        axios.get(`${rootUrl}/danh-muc`)
        .then(res => {
            setCategory(res.data);
        })
        .catch(err => {
            console.log(err);
        })
      
            globalAction.user.getUserLocal()
            .then(val=>{
                if(val){
                   console.log(val);
                }
                else
                {
                    props.navigation.navigate('Login');
                }
            })
            globalAction.product.getListProduct();
            axios.get(`${rootUrl}/mobile/tham-khao`)
            .then(res=>{
              
                setReferences(res.data)
            })
            .catch(err =>{
                console.log(err);
            })
        globalAction.product.getNumberItemInCart();

    },[]);

    return (
     
        <View style={{flex:1,flexDirection:"column",display:"flex",backgroundColor:'#ECF3FF'}}>
            <View>
                <Menu navigation={props.navigation} title="Trang Chủ"/>
            </View>
            <ScrollView>
                <View style={{flex:1}} navigation={props.navigation}>
                    <Slider images={slideImage} />
                </View>
                <View style={{flex:3}}>
                    <ListCategory data = {category} navigation={props.navigation} />
                </View>
                <View style={{flex:3}}>
                    <ListProduct ListProduct={globalState.products} navigation={props.navigation} />
                </View>
                <View style={{flex:3}}>
                    <ListReference references={references} navigation={props.navigation} />
                </View>
            </ScrollView>
           
        </View>
    
    )
  
}

    