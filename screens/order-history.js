import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {View,StyleSheet} from 'react-native';
import useGlobal from '../store';
import {rootUrl} from '../config';


export function OrderHistoryScreen(props){
    const [globalState,globalAction]=useGlobal();
    const [orderList,setOrderList]=useState([]);

    useEffect(()=>{
        axios.get(`${rootUrl}/dat-hang/danh-sach-mua-hang/`+globalState.user._id).then(res=>{
         
          if(res.data.data!=undefined){
            setOrderList(res.data.data);
          }
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    function parseDate(str)
    {

        const date = str.substr(1,10).split('-');
        return `${date[2]}/${date[1]}/${date[0]}`
    }

    return (
      <Container>
        <Content>
          <List>
            {orderList.map((item,index)=>(
              <ListItem thumbnail>
                <Left>
                  <Thumbnail style={{resizeMode:"contain"}} square source={{ uri:`${rootUrl}/product-image/`+item.idProduct.image[0]}} />
                </Left>
                <Body>
                    <Text style={{fontSize:18,fontWeight:"bold"}}>{item.idProduct.name}</Text>
                    <Text style={{paddingTop:7}}>{item.totalPrice}đ</Text>
                   
                 
                  
                </Body>
                <Right>
            <Text  style={{paddingTop:7}} note numberOfLines={1}>Ngày mua: {parseDate(item.date)}</Text>
                </Right>
              </ListItem>
            ))}
            
          </List>
        </Content>
      </Container>
    );
  
}
