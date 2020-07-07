import React, { Component,useState,useEffect} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {ReferenceDetail} from '../components/reference-detail/reference-detail';
import Menu from '../components/menu/Menu';
import ListComment from '../components/list-comment/list-comment'
function ReferenceDetailScreen(props) {
    const { navigation } = props;
    const [reference,setReference] = useState(navigation.getParam('reference')||{});
    useEffect(()=>{
      setReference(navigation.getParam('reference'));
  
    },[])
    return (
        <View style={{display:'flex',flex:1}}>
          <Menu navigation = {props.navigation} title="Tham khảo" isBack = {true}/>
              <ScrollView>
                <ReferenceDetail navigation={props.navigation} reference={reference} />
                <ListComment pageComment="THAMKHAO" idPage={reference._id}/>  
              </ScrollView>
        </View>
    )
}

ReferenceDetail.navigationOptions = props => ({
  title: props.navigation.getParam('ReferenceDetail').name
});
    
export default ReferenceDetailScreen;