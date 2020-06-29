import React,{Component,useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,Image,Button } from 'react-native';
import styles from './stylesheet';

const OrderFood = (props) =>{
    var count = 0;
    return(
       <View style={styles.container}>
         <View style={styles.wrapImage}>
           <Image 
           style ={styles.image}
           source ={{uri : props.data.image}}
           />
         </View>
          <View style={{flex:1}}>
           <View style={{flexDirection:'row',padding:10,marginLeft:10}}>
              <Text style={{fontSize:24,flex:5}}>
                {props.data.name}     :
              </Text>
              <Text style={{fontSize:24,flex:5}}>
                {props.data.price} VNĐ / KG
              </Text>
            </View>
            <View style={{backgroundColor:'green',flex:1,padding:20,margin:20}}>
             <View style={{flex:1,flexDirection:'row'}}>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Button 
                  title='-'
                  onPress={() => (count=count-1)}
                />
                <Text style={{fontSize:24,color:'white'}}>{count}</Text>
                <Button 
                  title='+'
                  onPress={() => {(count=count+1); alert(count)}}
                />
               </View>
               <View style={{flex:2,justifyContent  :'flex-end',marginLeft:100}}><Button title='Thêm vào giỏ'/></View>
             </View>

           </View>
           <View style={{flex:5}}>
             <Text style={{fontSize:30}}>Detail</Text>
             <Text style={{padding:10,fontSize:15}}>
               {props.data.reference}
             </Text>
           </View>
          </View>
       </View>
       
    );
}


export default OrderFood;
