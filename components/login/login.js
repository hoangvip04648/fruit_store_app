import React,{useState} from 'react';
import  useGlobal from '../../store';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput ,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import {styles} from './stylesheet';
  const Login =  (props) => {
     
    const [ globalState, globalAction ] = useGlobal();
    const {navigation} = props;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    const [color,setColor] = useState('red');
    const [loading, setLoading] =useState(false);
   
    function handleSubmit(){
      if(!email || !password)
      {
        setMessage('Email hoặc password không được để trống');
        return;
      }
      else
      {
        setLoading(true);
      
        const data={
          email:email,
          password: password
        }

        globalAction.user.login(data)
        .then(res => {
          
          if(res == true)
          {
            
            navigation.navigate('Home');
            setLoading(false);
          }
          else
          {
            setLoading(false);
              setMessage(globalState.alert);
          }
        })
        .catch( err => {
          setLoading(false);
            console.log(err);
        })
      }
    }
    const mess=<Text style={{color:color,textAlign:"center",fontWeight:'bold'}}>{message}</Text>
    return (
      <View style={styles.container}>
        {loading ? <ActivityIndicator size="large"  color="green" />: null}
        <ImageBackground source={{uri:'https://i.pinimg.com/736x/93/b8/69/93b869aa9d75838856c63ad92a4d1400.jpg'}} style={{width: '100%', height: '100%'}}>
          <View style={styles.title}><Text style={styles.texttitle}>Welcome back!!</Text></View>
          <View style={styles.form}>
            <View style={{alignItems:'center'}}>
              <View style={{width:'80%'}}>
                <Text style={{fontWeight:'bold'}}>Email</Text>
                <TextInput textContentType="emailAddress" style={styles.input} value={email} onChangeText={(text)=>setEmail(text)}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontWeight:'bold'}}>Mật khẩu</Text>
                <TextInput secureTextEntry={true} style={styles.password} value={password} onChangeText={(text)=>setPassword(text)} />
              </View>
            </View>
            {mess}
            <View style={{width:'90%',alignItems:'center',alignSelf:'center'}}>
             <TouchableOpacity onPress={handleSubmit} style={{paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:20 ,backgroundColor:"#337ab7",borderRadius:5,alignSelf:'center'}}><Text style={{fontWeight:'bold',color:'white'}}>Đăng nhập</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}><Text style={{fontWeight:'bold',color:'white',textAlign:'center',paddingTop:20}}>Bạn chưa có tài khoản?</Text></TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
  

  export default Login;