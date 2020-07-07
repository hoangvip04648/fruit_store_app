import React,{useState,useEffect} from 'react';
import FormData from 'form-data';
import {Image,View,ImageBackground,ScrollView,TouchableOpacity,Alert,AsyncStorage} from 'react-native';
import { Container, Header, Content, Badge, Text, Icon ,Thumbnail, Button} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import  useGlobal from '../../store';
import {rootUrl} from '../../config';
const Profile = (props)=>{
    const {navigation}=props;
    const [globalState,globalAction]=useGlobal();
    const [avatar,setAvatar]=useState();
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [date,setDate]=useState();
    const [gender,setGender]=useState();
    const [phoneNumber,setPhoneNumber]=useState();
    const [address,setAddress]=useState();
    useEffect(()=>{
      AsyncStorage.getItem('user', (err, result) => {
        console.log("Ok",globalState.user);
        setName(JSON.parse(result).name);
        setEmail(JSON.parse(result).email);
        setDate(JSON.parse(result).date);
        setGender(JSON.parse(result).gender);
        setPhoneNumber(JSON.parse(result).phoneNumber);
        setAddress(JSON.parse(result).address);
        setAvatar(JSON.parse(result).avatar);
      });
    },[])
    useEffect(()=>{
      console.log('Vo') 
      AsyncStorage.getItem('user', (err, result) => {
        // console.log("Ok",globalState.user);
        setName(JSON.parse(result).name);
        setEmail(JSON.parse(result).email);
        setDate(JSON.parse(result).date);
        setGender(JSON.parse(result).gender);
        setPhoneNumber(JSON.parse(result).phoneNumber);
        setAddress(JSON.parse(result).address);
        setAvatar(JSON.parse(result).avatar);
      });
    },[globalState.user.name,globalState.user.email,globalState.user.gender,globalState.user.date,globalState.user.phoneNumber,globalState.user.address])

    let options = {
      title: 'Chọn ảnh',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    function updateAvatar(){
      ImagePicker.showImagePicker(options, (response) => {
        const data = new FormData();
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        data.append('file',{type:'image/jpg',uri:response.uri,name:"file"} );
        var url = `${rootUrl}/user/upAvatar/`+globalState.user._id;
        // data.append('file', response);
        axios.put(`${rootUrl}/user/upAvatar/`+globalState.user._id,data,config)
          .then(res=>{
           if(res.data){
             Alert.alert("Thông báo","Cập nhật thành công");
             res.data.token=globalState.user.token;
             globalAction.user.upAvatar(res.data);
             setAvatar(res.data.avatar);
           }
          })
          .catch(err=>{
            console.log(err);
          })
        })
      
      
    }
    return(
    <View style={{flex:1}}>
        <View style={{flex:12}}>
         <ImageBackground source= {require('../../public/image/background.jpg')} style={{width:"100%",height:"100%"}}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Thumbnail source={{uri:avatar}} style={{height:120,width:120,borderRadius:60,position:"absolute",borderBottomWidth:2,borderColor:"white"}}/>
          <View style={{position:"absolute",left:10,bottom:10}}><TouchableOpacity onPress={updateAvatar} style={{width:40,height:40}}><Image  source={require('../../public/logo/camera.png')}  style={{width:40,height:40}}/></TouchableOpacity></View>
        </View>
        </ImageBackground>
        </View>
        <View style={{flex:20}}>
          <View style={{flex:10,marginLeft:10}}>
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",alignItems:"center",flexDirection:"row",height:50}}>
              <Text style={{fontSize:15}}>Tên tài khoản</Text><Text style={{position:"absolute",left:"40%",color:"gray",color:"gray",fontSize:13}}>{name}</Text>
            </View>
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",justifyContent:"center",height:50}}>
              <Text style={{fontSize:15}}>Email</Text><Text style={{position:"absolute",left:"40%",color:"gray",fontSize:13}}>{email}</Text>
            </View>
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",justifyContent:"center",height:50}}>
              <Text style={{fontSize:15}}>Ngày Sinh</Text><Text style={{position:"absolute",left:"40%",color:"gray",fontSize:13}}>{date}</Text>
            </View>
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",justifyContent:"center",height:50}}>
              <Text style={{fontSize:15}}>Giới tính</Text><Text style={{position:"absolute",left:"40%",color:"gray",fontSize:13}}>{gender}</Text>
            </View>
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",justifyContent:"center",height:50}}>
              <Text style={{fontSize:15}}>Điện thoại</Text><Text style={{position:"absolute",left:"40%",color:"gray",fontSize:13}}>{phoneNumber}</Text>
            </View>
            <View style={{justifyContent:"center",height:50}}>
              <Text style={{fontSize:15}}>Địa chỉ</Text><Text style={{position:"absolute",left:"40%",color:"gray",fontSize:13,width:"60%"}}>{address}</Text>
            </View>
          </View>
            <View style={{backgroundColor:"#dddddd"}}>
                <View style={{justifyContent:"center",alignItems:"center",height:50}}>
                    <TouchableOpacity style={{backgroundColor:"#189eff",padding:10,borderRadius:10}} onPress={()=>navigation.navigate('ChangeProfile')}><Text>Thay đổi thông tin</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    )
}




export default Profile;