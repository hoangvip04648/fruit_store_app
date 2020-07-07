import React,{Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,Image,TouchableOpacity } from 'react-native';
import img from '../../public/image/user.png';
import styles from './stylesheet';
import {rootUrl} from '../../config'
function Item({name,image,navigate,id,isHome}){
    return(
        <TouchableOpacity style={styles.item} onPress={()=>navigate('ListProduct',{category:{name:name,idCategory:id},isHome:isHome})}>
            <View >
                <Image 
                style={{width:'100%',height:40,resizeMode:'contain'}}
                source ={{uri:`${rootUrl}/upload/category/${image}`}}
                />
                <Text style={{fontSize:15,textAlign:'center',color:'white',fontWeight:'bold',marginTop:2}}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const ListCategory = (props) =>{
    const data = props.data;
    const {navigate}  = props.navigation;
    return(
        <View style={styles.container}>
            <Text style={{fontSize:20,color:'gray',fontWeight:'bold',paddingLeft:5}}>Danh mục</Text>
            <View style={styles.listcategory}>
                
                {data.map(item=>    
                        (<Item key={item.id} isHome={props.isHome} id={item._id} navigate={navigate} name={item.name} image={item.image} />)  
                        )
                }
            </View>
        </View>
    );
}

export default ListCategory;
