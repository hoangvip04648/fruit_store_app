import React,{Component,useState,useEffect} from 'react';
import {
    Text,
    View,
    ScrollView,
    FlatList,
    TextInput,
    Button,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage,Image
} from 'react-native';
import styles from './stylesheet';
import useGlobal from '../../store';
import axios from 'axios';
import {rootUrl} from '../../config'
const Pay = (props)=>{
    const [globalState,globalAction] = useGlobal();
    const [address,setAddress] = useState(props.data.address);
    const [phoneNumber,setPhoneNumber]= useState(props.data.phoneNumber);
    const [editAddress,setEditAddress] = useState(false);
    const [editPhone,setEditPhone] = useState(false);
    const [note,setNote] = useState('');
    const userDetail=props.data;
    var thanhtien=0;
    var giamgia=0;
    var tongtien=0;
    useEffect(()=>{
        setEditAddress(false);
        setEditPhone(false);
    },[])
    const [products,setProducts]=useState([]);

    const handleOrderButton=()=>{
        const productBody = products;
       
        if(products.length == 0)
        {
            alert('Bạn hiện chưa có đơn hàng nào')
        }
        else
        {
            productBody.forEach(item => {item.totalPrice = item.price * item.numberItem});
            axios.post(`${rootUrl}/dat-hang`,{
                idUser:userDetail._id,
                products:productBody,
                destination:address,
                totalPrice:thanhtien,
                note:note
            }
            ).then(res=>{
                if(res.data.success)
                {
                    alert(res.data.message);
                    setProducts([]);
                    AsyncStorage.removeItem('ListProduct');
                }
            }).catch(err=>{
                console.log(err);
            });
        }
      
        
    }

    const removeAProduct=async (name)=>{
        console.log(name);

        AsyncStorage.getItem('ListProduct').then(ListProduct=>{
            if(ListProduct!=null){
                var ListProductJson=JSON.parse(ListProduct);
                for(let i=0;i<ListProductJson.products.length;i++){
                    if(ListProductJson.products[i].name==name){
                        ListProductJson.products.splice(i, 1);
                        break;
                    }
                }
                AsyncStorage.removeItem("ListProduct").then(value=>{
                    
                        AsyncStorage.setItem('ListProduct',JSON.stringify(ListProductJson));
                      
                        setProducts(ListProductJson.products);
                        globalAction.product.getNumberItemInCart();
                    
                }).catch(err=>{
                    console.log(err);
                });
            }  
            
        }).catch(e=>{
            console.log(e);
        });
    }

    

    useEffect(function getStorage(){
        try{
            AsyncStorage.getItem('ListProduct').then(ListProduct=>{
                if(ListProduct!=null){
                    var ListProductJson=JSON.parse(ListProduct);
                    setProducts(ListProductJson.products);
                }
            }).catch(e=>{
                console.log(e);
            });
            
        }catch(e){
            console.log(e);
        }
      
    },['products'])

    return(
        <View>
            <ScrollView >
                <View style={{flex:1,backgroundColor:"#ECF3FF"}}>
                    <View style={styles.rowOne}>
                        <View style={{flex:2,justifyContent:'center'}}>
                            <Text style={{fontSize:16}}>Giao hàng đến :</Text>
                            <TextInput style={{paddingLeft:10,fontSize:16,fontWeight:'bold',lineHeight:22,width:"90%"}} multiline={true}  editable={editAddress} value={address} onChangeText={(text)=>setAddress(text)} />
                        </View>
                        <TouchableOpacity onPress={()=>setEditAddress(true)} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:"#00BFFF",height:40,alignSelf:"center",borderRadius:5}}>
                            <Text style={{color:"white"}}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowTwo}>
                    <View style={{flex:2,justifyContent:'center'}}>
                        <Text style={{fontSize:16}}>Số điện thoại :</Text>
                        <TextInput style={{fontSize:16,fontWeight:'bold',lineHeight:22,paddingLeft:10}} multiline={true}  editable={editPhone} onChangeText={(text)=>setPhoneNumber(text)}>{phoneNumber}</TextInput>
                    </View>  
                    <TouchableOpacity onPress={()=>setEditPhone(true)} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:"#00BFFF",height:40,alignSelf:"center",borderRadius:5}}>
                        <Text style={{color:"white"}}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.rowThree}>
                    <Text style={{fontSize:16}}>Sản phẩm :</Text>
                        <View style={{justifyContent:'center',flex:1,justifyContent:'space-around'}}>
                        <View style={{marginTop:5,shadowOffset:{width:1,height:1},elevation:2,borderRadius:5,paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10,minHeight:70}}>
                            {
                                products.map((item)=>{
                                tongtien+=item.price*item.numberItem;
                                giamgia+=(item.price*item.discount/100)*item.numberItem;
                                thanhtien=tongtien-giamgia;
                                return  (
                                        <View style={{flexDirection:'row',justifyContent:'center',paddingLeft:10}}>
                                            <View style={{flex:2}}>
                                                <Text style={{fontSize:16,color:'rgba(0,0,0,0.7)',marginBottom:5}}>{item.numberItem}x   {item.name}</Text>
                                            </View>
                                            <View style={{flex:2}}>
                                                <Text style={{fontSize:16,color:'rgba(0,0,0,0.7)',paddingLeft:6}}>{item.price*item.numberItem}</Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <TouchableOpacity onPress={()=>removeAProduct(item.name)}> 
                                                    <View style={{backgroundColor:"#d9534f",width:34,borderRadius:4}}>
                                                        <Text style={{color:'white',padding:2,textAlign:"center",fontWeight:'bold'}}>Xóa</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        );
                                })
                        }
                        </View>
                        <Text style={{fontSize:16,fontWeight:'bold',paddingTop:10}}>Tổng tiền:                  {tongtien} đ</Text>
                        <Text style={{fontSize:16,fontWeight:'bold',paddingTop:10}}>Giảm giá :                  {giamgia} đ</Text>
                        </View>
                        <View style={{flex:2}}></View>
                        <View style={{flex:2}}></View>
                    </View>
                    <View style={styles.rowFour}>
                        <Text  style={{fontSize:15}}>Thêm thông tin khi nhận hàng :</Text>
                        <TextInput style={{borderColor:'black',borderRadius:5,textAlignVertical:'top',width:'95%',height:100,shadowOffset:{width:1,height:1},elevation:2,paddingLeft:10,marginBottom:5,marginTop:5}} onChangeText={(text)=>setNote(text)}></TextInput>
                    </View>
                    <View style={styles.rowFive}>
                <View style={{flex:1,justifyContent:"center"}}>
                    <Text style={{fontSize:16}}>Phương thức thanh toán</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={handleOrderButton}  style={{flexDirection:"row",justifyContent:"center",alignItems:'center',width:'90%',paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10 ,borderRadius:5}}>
                        <Text style={{fontWeight:'bold',color:'black',textAlign:'center'}}>Thanh toán khi nhận hàng</Text>
                        <Image source ={{uri:'https://cdn.iconscout.com/icon/free/png-256/chevron-thin-right-1859438-1577834.png'}} style={{ width:20,height:20,resizeMode:'contain',}}/> 
                    </TouchableOpacity>
                   

                </View>
            </View>
                </View>
            </ScrollView>
            <View style={styles.rowSix}>
                <View style={{flex:1,alignItems:'flex-end',paddingRight:'5%',justifyContent:'center'}}>
                    <Text style={{fontSize:16}}>Tổng thanh toán</Text>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>{thanhtien}đ</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',backgroundColor:"#00BFFF"}}>
                    <TouchableOpacity onPress={handleOrderButton}  style={{height:'100%',justifyContent:"center"}}>
                        <Text style={{fontWeight:'bold',color:'white',textAlign:'center'}}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}



export default Pay;