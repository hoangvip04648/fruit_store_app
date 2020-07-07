import React,{Component,useState,useEffect} from 'react';
import {
    Text,
    View,
    ScrollView,

    TextInput,
    ActivityIndicator,
    TouchableOpacity,

    AsyncStorage,
    Alert
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
    const [products,setProducts]=useState([]);
    const [note,setNote] = useState('');
    const userDetail=props.data;
    const [loading,setLoading]=useState(false);

    const {navigate} = props.navigation;


    var thanhtien=0;
    var giamgia=0;
    var tongtien=0;
    useEffect(()=>{
        console.log(props.data)
        setEditAddress(false);
        setEditPhone(false);
    },[])
  

    const parseMoney =  (value)=>{
        return value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];
    }

    const handleOrderButton= async ()=>{
        setLoading(true);
        setTimeout(() => {
            if(loading==true){
                setLoading(false);
                Alert.alert("Thông báo","Server không phản hổi",["OK"])  
            }
          
        }, 10000);
        const productBody = products;
       
        if(products.length == 0)
        {
            return Alert.alert("Thông báo","Vui lòng chọn sản phẩm",[{text:'OK'}])
        }
        else
        {
            productBody.forEach(item => {item.totalPrice = item.price * item.numberItem});
            await axios.post(`${rootUrl}/dat-hang`,{
                idUser:userDetail._id,
                products:productBody,
                destination:address,
                totalPrice:thanhtien,
                note:note
            }
            ).then(res=>{
                if(res.data.success)
                {
                    setLoading(false);
                    setProducts([]);
                    AsyncStorage.removeItem('ListProduct');
                    globalAction.product.changeNumberItemCart();
                    if(res.data.success==true){
                        Alert.alert("Thông báo",'Đặt hàng thành công',[{text:'CANCLE'},{text:'OK',onPress:() =>{props.navigation.navigate('OrderHistory')}}]);
                    }else{
                        Alert.alert("Thông báo",'Đặt hàng không thành công',[{text:'CANCLE'},{text:'OK'}]);
                    }
                   
                   
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
    const firstProduct = (item)=>{
        return (
            <View style={{flexDirection:'row',justifyContent:'center',paddingLeft:10}}>
                <View style={{flex:2}}>
                    <Text style={{fontSize:16,color:'rgba(0,0,0,0.7)',marginBottom:5}}>{item.numberItem}x   {item.name.length > 13 ? item.name.slice(0,9)+'...' : item.name}</Text>
                </View>
                <View style={{flex:2}}>
                    <Text style={{fontSize:16,color:'rgba(0,0,0,0.7)',paddingLeft:6}}>{parseMoney(item.price)} đ</Text>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={()=>removeAProduct(item.name)}> 
                        <View style={{backgroundColor:"#d9534f",width:34,borderRadius:4}}>
                            <Text style={{backgroundColor:'#d9534f',color:'white',padding:2,textAlign:"center",fontWeight:'bold',borderRadius:4}}>Xóa</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


        )
    }
    
    const proudct = (item)=>{
        return (
            <View style={{flexDirection:'row',justifyContent:'center',paddingLeft:10,marginTop:5,borderTopWidth:1,borderTopColor:'gray',paddingTop:10}}>
            <View style={{flex:2}}>
                <Text style={{fontSize:16,color:'rgba(0,0,0,0.7)',marginBottom:5}}>{item.numberItem}x   {item.name}</Text>
            </View>
            <View style={{flex:2}}>
                <Text style={{fontSize:16,color:'rgba(0,0,0,0.7)',paddingLeft:6}}>{parseMoney(item.price*item.numberItem)} đ</Text>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>removeAProduct(item.name)}> 
                    <View style={{backgroundColor:"#d9534f",width:34,borderRadius:4}}>
                        <Text style={{color:'white',padding:2,textAlign:"center",fontWeight:'bold'}}>Xóa</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

    const maplistProduct = (products)=>{
        if(products.length==0){
            return(
                <Text>Không có sản phẩm</Text>
            )
        }
        return (
            products.map((item,index)=>{
                tongtien+=item.price*item.numberItem;
                giamgia+=(item.price*item.discount/100)*item.numberItem;
                thanhtien=tongtien-giamgia;
                
                if(index == 0){
                    return  (
                        firstProduct(item)
                        );
                }
                else{
                    return  (
                        proudct(item)
                        );
                }
                
                })
        )
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
      
    },[products])

     return(
        <ScrollView >
         <View style={{flex:1,backgroundColor:"#ECF3FF"}}>
            {loading ? <ActivityIndicator size="large"  color="green" />: null}
            <View style={styles.rowOne}>
                <View style={{flex:2,justifyContent:'center'}}>
                    <Text style={{fontSize:14,fontWeight:'bold'}}>Giao hàng đến :</Text>
                    <TextInput style={{paddingLeft:10,fontSize:16,fontWeight:'bold',lineHeight:22,width:"90%"}} multiline={true}  editable={editAddress} value={address} onChangeText={(text)=>setAddress(text)} />
                </View>
                <TouchableOpacity onPress={()=>setEditAddress(true)} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:"#00BFFF",height:40,alignSelf:"center",borderRadius:5}}>
                    <Text style={{color:"white",textAlign:'center',width:"90%",paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10 ,backgroundColor:"#00BFFF",borderRadius:5}}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rowTwo}>
            <View style={{flex:2,justifyContent:'center'}}>
                <Text style={{fontWeight:'bold'}}>Số điện thoại :</Text>
                <TextInput style={{fontSize:16,fontWeight:'bold',lineHeight:22,paddingLeft:10}} multiline={true}  editable={editPhone} onChangeText={(text)=>setPhoneNumber(text)}>{phoneNumber}</TextInput>
            </View>  
            <TouchableOpacity onPress={()=>setEditPhone(true)} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:"#00BFFF",height:40,alignSelf:"center",borderRadius:5}}>
                <Text style={{color:"white",textAlign:'center',width:"90%",paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10 ,backgroundColor:"#00BFFF",borderRadius:5}}>Chỉnh sửa</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.rowThree}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>Sản phẩm :</Text>
                <View style={{justifyContent:'center',flex:1,justifyContent:'space-around'}}>
                   <View style={{shadowOffset:{width:1,height:1},elevation:2,borderRadius:5,paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10}}>
                    {
                       maplistProduct(products)
                        
                    }
                </View>
                <Text style={{fontSize:16,fontWeight:'bold',paddingTop:10}}>Tổng tiền:                  {parseMoney(tongtien)} đ</Text>
                <Text style={{fontSize:16,fontWeight:'bold',paddingTop:10}}>Giảm giá :                  {parseMoney(giamgia)} đ</Text>
                </View>
                <View style={{flex:2}}></View>
                <View style={{flex:2}}></View>
            </View>
            <View style={styles.rowFour}>
                <Text  style={{fontSize:15,fontWeight:'bold'}}>Thêm thông tin khi nhận hàng :</Text>
                <TextInput style={{borderColor:'black',borderRadius:5,textAlignVertical:'top',width:'95%',height:100,shadowOffset:{width:1,height:1},elevation:2,paddingLeft:10,marginBottom:5}} onChangeText={(text)=>setNote(text)}></TextInput>
            </View>
            <View style={styles.rowFive}>
                <View style={{padding:10,flex:1}}>
                    <Text style={{fontSize:16}}>Tổng cộng</Text>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'red'}}>{parseMoney(thanhtien)} đ</Text>
                </View>
                <View style={{flex:1,justifyContent:'center'}}>
                    <TouchableOpacity onPress={handleOrderButton}  style={{width:"90%"}}>
                        <Text style={{fontWeight:'bold',color:'white',textAlign:'center',width:"90%",paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10 ,backgroundColor:"#00BFFF",borderRadius:5}}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
         </View>
        </ScrollView>
    )
}



export default Pay;