import React, {Component,useState,useEffect} from 'react';
import {View,Text,Dimensions,ScrollView,StyleSheet,Image,FlatList} from 'react-native';
import {rootUrl} from'../../config';


export const ReferenceDetail= (props) =>{
    const [reference,setReference] = useState(props.reference);
    const {height,width}=Dimensions.get('window');
    const [content,setContent] = useState(reference.content || []);
    useEffect(()=>{
      setReference(props.reference);
    },[props.reference])
    return(
      <View style={{paddingLeft:10,paddingRight:10}}>
        <Text style={styles.title}>{reference.title}</Text>
        <Text style={styles.date}>{reference.date}</Text>
       
       {  content.map((item,index) => <View style={styles.paragraph}>
       <Image source={{uri:`${rootUrl}/${reference.image[index]}`}} style={{width:width-20,height:0.3*height,alignSelf:'center'}} />
       <Text style={{paddingTop:10}}>{item}</Text>
      
       </View>) }
        
      </View>
    )
}

 const styles=StyleSheet.create({
   title:{
     textAlign:'center',
     fontSize:23,
     fontWeight:'bold'
   },
   date:{
     textAlign:'center',
     fontSize:15,
     color:"gray"
   },
   paragraph:{
     paddingTop:10,
     paddingBottom:10
   }
 })
 