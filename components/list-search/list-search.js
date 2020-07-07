import React, { useState,useEffect } from 'react';
import {TouchableOpacity,View,TextInput,StyleSheet,Text,Image} from 'react-native';
import {  Content, Card, CardItem,Spinner } from 'native-base';
import {rootUrl} from '../../config';
export default function ListSearch(props) {
    const {navigation} = props;
   
    const {fetchData} = props;
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
            <TouchableOpacity style={{flex:1}}  onPress={()=>navigation.goBack()}>
                <Image source ={{uri:'https://www.pngix.com/pngfile/middle/339-3394476_arrow-icons-png-free-arrow-back-icon-png.png'}} style={styles.iconBack}/>
            </TouchableOpacity>
                <TextInput onChangeText={(text)=>fetchData(text)} autoCorrect={true} style={styles.searchInput} placeholder="Tìm kiếm..." />
            </View>
            <View style={styles.resultContainer}>
                <Content>
                    <Card style={{backgroundColor:'#ECF3FF'}}>
                        {props.results.map((item,index)=><TouchableOpacity onPress={()=>navigation.navigate('ProductDetail',{product:item})} >
                            <CardItem key={index} style={styles.resultItem}>
                                <Image source={{uri:`${rootUrl}/product-image/${item.image[0]}`}} style={styles.imageResult} />
                                <Text style={styles.textResult}>{item.name} </Text>
                            </CardItem>
                        </TouchableOpacity>)}
                        
                    </Card>
                </Content>
            </View>
            <View style={{position:'absolute',top:50,left:"45%"}}>
                
                <Content>
                     {props.isLoading ? <Spinner /> : null}
                 </Content>
            </View>
            
      </View>

    );
  
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
    },
    searchBar:{
        height:50,
        alignContent:'center',
        alignItems:"center",
        flexDirection:'row',
        borderBottomWidth:0.5
    },
    searchInput:{
        flex:4,
        height:35,
        shadowOffset:{width:1,height:1},
        shadowRadius:15,
        elevation:1.5,
        borderRadius:20,
        marginRight:5,
        justifyContent:'center',
        fontSize:13,
        backgroundColor:'#ECF3FF',
        paddingLeft:15
    },
    iconBack:{
        width:20,
        height:20,
        resizeMode:'contain',
        marginLeft:10
    },
    resultContainer:{
        flex:12,
        backgroundColor:'#ECF3FF'
    },
    imageResult:{
        width:35,
        height:35,
        resizeMode:'cover',
        borderRadius:20,
        borderWidth:1,
        marginRight:10
    },
    resultItem:{
        margin:2,
        shadowOffset:{width:1,height:1},
        elevation:1,
        height:45,
    },
    textResult:{
        fontWeight:'bold'
    }
})  