import React,{Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,Image,TouchableOpacity } from 'react-native';
import img from '../../public/image/user.png';
import styles from './stylesheet';
import {rootUrl} from '../../config'
function Item({name,image,navigate,id}){
   
    return(
        <TouchableOpacity style={styles.item} onPress={()=>navigate('ListProduct',{category:{name:name,idCategory:id}})}>
            <View >
                <Image 
                style={{width:'100%',height:40,resizeMode:'contain'}}
                source ={{uri:`${rootUrl}/upload/category/${image}`}}
                />
                <Text style={{fontSize:15,textAlign:'center',color:'black',fontWeight:'bold'}}>
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
            <Text style={{fontSize:20,color:'gray',fontWeight:'bold'}}>Danh mục</Text>
            <View style={styles.listcategory}>
                
                {data.map(item=>    
                        (<Item key={item.id} id={item._id} navigate={navigate} name={item.name} image={item.image} />)  
                        )
                }
            </View>
        </View>
    );
}

export default ListCategory;
