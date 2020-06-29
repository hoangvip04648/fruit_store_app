import React,{useState,useEffect} from 'react';
import {Image,View,ImageBackground,ScrollView,TouchableOpacity,TextInput,AsyncStorage} from 'react-native';
import { Container, Header, Content, Badge, Text, Icon ,Thumbnail, Button} from 'native-base';
import  useGlobal from '../../store';
const ChangeProfile = (props)=>{
    const {navigation}=props;
    const [globalState,globalAction]=useGlobal();
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [date,setDate]=useState();
    const [gender,setGender]=useState();
    const [phoneNumber,setPhoneNumber]=useState();
    const [address,setAddress]=useState();

    useEffect(()=>{
      AsyncStorage.getItem('user', (err, result) => {
        setName(JSON.parse(result).name);
        setEmail(JSON.parse(result).email);
        setDate(JSON.parse(result).date);
        setGender(JSON.parse(result).gender);
        setPhoneNumber(JSON.parse(result).phoneNumber);
        setAddress(JSON.parse(result).address);
      });
    },[])

    // AsyncStorage.getItem('user',(e,r)=>{
    //   console.log(r)
    // })
    function updateUser(){
      const data = {
        name:name,
        email : email,
        address:address,
        phoneNumber:phoneNumber,
        gender:gender,
        date : date,
        id : globalState.user._id
      }
        return new Promise((resolve,rejects)=>{
          globalAction.user.updateUser(data)
          .then(res=>{
            if(res){
              navigation.navigate("Profile");
            }
            else{
              alert("Cập nhật không thành công do lỗi hệ thống.Vui lòng nhập lại");
            }
          })

        })
      
    }

    return(
    <View style={{flex:1}}>
        <View style={{height:"100%"}}>
            <View style={{marginLeft:10,flex:7}}>
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",flex:1,alignItems:"center",flexDirection:"row"}}>
              <Text style={{fontSize:15}}>Tên tài khoản</Text><TextInput onChangeText={value=>{setName(value)}} style={{position:"absolute",left:"40%",color:"gray",fontSize:16,width:"100%"}} placeholder="..." value={name}/>
            </View>
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",flex:1,justifyContent:"center"}}>
              <Text style={{fontSize:15}}>Ngày sinh</Text><TextInput onChangeText={value=>{setDate(value)}} style={{position:"absolute",left:"40%",color:"gray",fontSize:16,width:"100%"}} placeholder="...">{date}</TextInput>
            </View>
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",flex:1,justifyContent:"center"}}>
              <Text style={{fontSize:15}}>Giới tính</Text><TextInput onChangeText={value=>{setGender(value)}} style={{position:"absolute",left:"40%",color:"gray",fontSize:16,width:"100%"}} placeholder="...">{gender}</TextInput>
            </View>
           
            <View style={{borderBottomWidth:1,borderColor:"#dddddd",flex:1,justifyContent:"center"}}>
              <Text style={{fontSize:15}}>Điện thoại</Text><TextInput onChangeText={value=>{setPhoneNumber(value)}} style={{position:"absolute",left:"40%",color:"gray",fontSize:16,width:"100%"}} placeholder="...">{phoneNumber}</TextInput>
            </View>
            <View style={{flex:2,justifyContent:"center"}}>
              <Text style={{fontSize:15}}>Địa chỉ</Text><TextInput onChangeText={value=>{setAddress(value)}} style={{position:"absolute",left:"40%",color:"gray",fontSize:16,width:"60%"}} multiline={true} placeholder="...">{address}</TextInput>
            </View>
          </View>
            <View style={{flex:3,backgroundColor:"#dddddd"}}>
                <View style={{flex:1,marginTop:20,alignItems:"center"}}>
                    <TouchableOpacity style={{backgroundColor:"#189eff",padding:10,borderRadius:10}} onPress={updateUser}><Text>Cập nhật</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    )
}




export default ChangeProfile;