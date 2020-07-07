import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import {rootUrl} from '../../config'
import {
  View,
  Text,
  TextInput ,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import {styles} from './stylesheet';

const SignUp =  (props) => {
  const {navigation} = props;
  const [email,setEmail] = useState('');
  const [password1,setPassword1] = useState('');
  const [password2,setPassword2] = useState('');
  const [isValid,setIsValid] = useState(null);
  const [message,setMessage] = useState('');
  const [color,setColor] = useState('red');
  function handleSubmit(){
      if(password1 == password2 && password1 && password2)
      {
        setIsValid(true);
        axios.post(`${rootUrl}/user/tao-tai-khoan`,{
          email:email,
          password:password1
        })
        .then(res=>{
          if(res.data.success)
          {
            setColor('green');
            setMessage(res.data.message);
              console.log('dang ky thanh cong');
            setTimeout(()=>
              navigation.navigate('Login')
            ,500);
           
          }
          else
          {
            setMessage(res.data.message);
          }
        })
        .catch(err=>{
          console.log(err);
          setMessage(err.Error);
         
        })
      } 
      else
      {
        setIsValid(false);
      }
  }
    const mess=<Text style={{textAlign:'center',color:"red",fontWeight:'bold'}}>Mật khẩu không trùng khớp</Text>;
    const messageRes=<Text style={{textAlign:'center',color:color,fontWeight:'bold'}}>{message}</Text>
    return (
       
      <View style={styles.container}>
        <ImageBackground source={{uri:'https://i.pinimg.com/736x/93/b8/69/93b869aa9d75838856c63ad92a4d1400.jpg'}} style={{width: '100%', height: '100%'}}>
          <View style={styles.title}><Text style={styles.texttitle}>Tạo tài khoản</Text></View>
    
              <View style={styles.form}>
            <View style={{alignItems:'center'}}>
              <View style={{width:'80%'}}>
                <Text>Email</Text>
                <TextInput id='user' style={styles.input} onChangeText={(val)=>setEmail(val)} value={email}/>
              </View>
              <View style={{width:'80%'}}>
                <Text>Mật khẩu</Text>
                <TextInput secureTextEntry={true} onChangeText={(val)=>setPassword1(val)} style={styles.password} value={password1}/>
              </View>
              <View style={{width:'80%'}}>
                <Text >Nhập lại mật khẩu</Text>
                <TextInput  secureTextEntry={true} style={styles.password} onChangeText={(val)=>{setPassword2(val)}} value={password2}/>
              </View>
            </View>

            {isValid == false ? mess: null}
            {messageRes}

            <View style={{alignItems:'center',}}>
              <TouchableOpacity onPress={handleSubmit} style={{paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,backgroundColor:'#337ab7',borderRadius:10}}
              
              ><Text style={{color:'white',fontWeight:'bold'}}>Đăng ký</Text></TouchableOpacity>
            </View>
          </View>
        
        </ImageBackground>
      </View>
    );
  };
  
  

  export default SignUp;