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
            "anh1.jpg",
            "anh2.jpg",
            "anh3.jpg",
            "anh4.jpg"                               
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
                console.log(res.data);
                setReferences(res.data)
            })
            .catch(err =>{
                console.log(err);
            })
        globalAction.product.getNumberItemInCart();
        

    },[]);

    return (
     
        <View style={{flex:1,flexDirection:"column",display:"flex",backgroundColor:'#f5f5f5'}}>
            <View>
                <Menu navigation={props.navigation}  isBack={false}/>
            </View>
            <ScrollView>
                <View style={{flex:1}} navigation={props.navigation}>
                    <Slider images={slideImage} />
                </View>
                <View style={{flex:3,marginTop:10}}>
                    <ListCategory data = {category} navigation={props.navigation} isBack={true} />
                </View>
                <View style={{flex:3}}>
                    <ListProduct isHome={true} ListProduct={globalState.products} navigation={props.navigation} isBack={true}/>
                </View>
                <View style={{flex:3}}>
                    <ListReference references={references} navigation={props.navigation} />
                </View>
            </ScrollView>
           
        </View>
    
    )
  
}

    