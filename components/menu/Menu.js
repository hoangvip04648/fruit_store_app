import React, { useState , useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import {Badge, Button} from 'native-base';
import {styles} from './stylesheet'

import  useGlobal  from "../../store";

export default function Menu(props) {
    const [displayMenu,setDisplayMenu] = useState(false);
    const [ globalState, globalAction ] = useGlobal();
    const {navigate} = props.navigation;
    const [isBack,setIsBack] = useState(props.isBack);

    useEffect(()=>{
        setIsBack(props.isBack);
    },[props.isBack])

    const LogOut = ()=>{           
       
        setDisplayMenu(false);  
        props.navigation.navigate('Home');
    }

    function handleDisplayMenu(){ 
        displayMenu ? setDisplayMenu(false) : setDisplayMenu(true);
    }
    const menu=
        <View style={styles.menu}>
            <View style={styles.header}>
                <ImageBackground source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-FHqMNoGT9nYTnz6CGJEGEsLOZoY8PL2oOCCzV-_HwsaQS8f5'}} style={{width:"100%",height:"100%"}}>
                    <TouchableOpacity onPress={()=>navigate('Profile')}>
                       <Image style={styles.avatar} source={{uri:globalState.user.avatar}} />
                   
                    <Text style={styles.textPrimary}>{globalState.user.name}</Text>
                    <Text style={styles.text}>Xem trang cá nhân của bạn</Text>
                    </TouchableOpacity>     
                </ImageBackground>
            </View>
            <View style={styles.body}>
                <TouchableOpacity  onPress={() =>{props.navigation.navigate('OrderHistory')}}>
                    <Text style={styles.menuItem}>Lịch sử mua hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>navigate('ChangeProfile')}>
                    <Text style={styles.menuItem}>Cập nhật thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.menuItem}>Hỗ trợ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {LogOut}>
                    <Text style={styles.menuItem}>Về trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() =>{
                    setDisplayMenu(false);
                    AsyncStorage.removeItem('user').then(val=>{props.navigation.navigate('Login')})
                    .catch(err=>console.log(err))}}>
                    <Text style={styles.menuItem}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>;
    const wrapper=<TouchableOpacity style={styles.wrapper} onPress={handleDisplayMenu}>
               
            </TouchableOpacity>

    const goBack =  <TouchableOpacity  onPress={()=>props.navigation.goBack()}>
                         <Image style={{backgroundColor:'black'}} source ={require('../../public/icon/iconBack.jpg')} style={styles.iconBack}/>
                    </TouchableOpacity> 

    return (
        <View style={styles.menuContainer}>
            
            <View style={styles.searchContainer} >
                {isBack ? goBack : null}
                <TouchableOpacity style={{backgroundColor:'white'}} onPress={()=>{navigate('Home')}} >
                    <Image source={require('../../public/logo/logo.png')} />
                </TouchableOpacity>
               
            </View>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Search')} style={styles.searchIconContainer}>
                <Image style={styles.searchIcon} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png"}}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartIconContainer} onPress={()=>{props.navigation.navigate('Pay')}} >
               <Text style={{position:'absolute',top:5,left:20,zIndex:2,backgroundColor:'red',borderRadius:10, width:20,height:20,textAlign:'center',color:'white',fontWeight:'bold'}}>
                   {globalState.numberItem}
                </Text>
                <Image style={styles.cartIcon} source={{uri:"data:image/png;base64,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"}}></Image>
            </TouchableOpacity>
            <View style={styles.buttonProfileContainer}>
                <TouchableOpacity onPress={handleDisplayMenu} style={{ height: "100%"}}>
                    <View style={styles.threePoint}>
                        <View style={styles.point}></View>
                        <View style={styles.point}></View>
                        <View style={styles.point}></View>
                    </View>
                </TouchableOpacity>
            </View>
           {
               displayMenu ? menu : null
           }
            {
                displayMenu ? wrapper : null
            }
            
        </View>
    )
  
}

    