import axios from 'axios';
import {AsyncStorage,Alert} from 'react-native'
import {rootUrl} from '../config'
export const login = ( store, data ) => {
    return new Promise((resolve,reject) => {
        store.setState({status:'LOADING'});
        axios.post(`${rootUrl}/login`,{
            email : data.email, 
            password : data.password
        })
        .then( res => {
         
            if(res.data.token)
            {
                const newUser={
                    ...res.data.user,token:res.data.token
                }
                AsyncStorage.setItem('user',JSON.stringify(newUser),(err) => {
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        store.setState({user:newUser});
                        store.setState({isLogin:true,status:'SUCCESS'});
                        resolve(true);
                    }
                })

                
                  
                //   AsyncStorage.setItem('user', JSON.stringify(newUser), () => {
                      
                //   });
               

            }
            else{
                store.setState({status:'FAIL',isLogin:false,alert:res.data.message});
                resolve(false);
            }
        })
        .catch( err => {
            store.setState({alert:'Không có kết nối mạng hoặc server không tồn tại'});
            reject(err);
        })
    })

   
}

export const getUserLocal = (store) => {
    return new Promise((resolve,reject) => {
        // AsyncStorage.removeItem('user');     
        AsyncStorage.getItem('user',(err,result) => {
            if(err){
                reject(err);
            }
            if(result != null)
            {
        
                store.setState({isLogin:true});
                store.setState({user:JSON.parse(result)});
                resolve(true);
            }
            else{
                resolve(false);
            }
        })
    })
}


export const updateUser = (store,data)=>{
    return new Promise((resolve,reject) => {       
        axios.put(`${rootUrl}/user/thay-doi-thong-tin`,{
            name:data.name,
            email : data.email,
            address:data.address,
            phoneNumber:data.phoneNumber,
            gender:data.gender,
            date : data.date,
            id : data.id
        })
        .then( res => {
            if(res.data)
            {       
                AsyncStorage.getItem('user',(err,result) => {
                    if(err){
                        reject(err);
                    }
                    if(result != null)
                    {
                        if(res.data.data!=null){
                            res.data.data.token= JSON.parse(result).token;
                            const newUser = {...res.data.data};
                            AsyncStorage.setItem('user',JSON.stringify(newUser),(err) => {
                                if(err){
                                    console.log(err);
                                }
                                else
                                {

                                   
                                    AsyncStorage.getItem('user', (err, result1) => {
                                        store.setState({user:JSON.parse(result1)});
                                        Alert.alert("Thông báo","Cập nhật thành công")
                                      });
                                    
                                    resolve(true);
                                }
                            })
                            resolve(true);
                        }
                        else{
                            reject(false)
                        }
                        
                        
                    }
                    else{
                        resolve(false);
                    }
                })
                
                
               
                resolve(true);
            }
            else{
                resolve(false);
            }
        })
        .catch( err => {
            console.log(err);
            reject(err);
        })
    })
}

export const upAvatar = (store,data)=>{ 
    return new Promise((resolve,reject)=>{
       store.setState({user:data}); 
       AsyncStorage.setItem('user',JSON.stringify(data),(err) => {
            if(err){
                console.log(err);
            }
            else
            {

                resolve(true);
            }
        })
    })
   
}


