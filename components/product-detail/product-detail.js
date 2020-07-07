import React, { Component,useState,useEffect } from 'react';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {rootUrl} from '../../config'
import axios from 'axios';
import useGlobal from '../../store';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  TextInput
} from 'react-native';
import {styles} from './stylesheet'
import ListComment from '../list-comment/list-comment'
import { Input } from 'native-base';


export default function ProductInformation(props) {
    const [product,setProduct]=useState(props.productInformation)
    const [globalState, globalAction ]  = useGlobal();
    const [message,setMessage] = useState('');
    const [numberItem,setNumberItem] = useState(0);
    const [rateUser , setRateUser]  = useState(0);
    const [color,setColor] = useState(['white','white','white','white']);
    const [dvt,setDvt] = useState("");
    useEffect(()=>{
        if(product.type == 'trai-cay'||product.type=='rau-cu')
        {
            setDvt('kg');
        }

        else if(product.type=='do-kho')
        {
            setDvt('Hộp')
        }
        else
        {
            setDvt('Chai/Ly')
        }
    },[props.productInformation])
    function handlePressBtn(num){
        setNumberItem(num);
        const newColor=color;
        for(let i=0;i<newColor.length;i++)
        {
            newColor[i]='white';
        }
        newColor[num-1]='red';
        setColor(newColor);
    }

    
    function incItem(){
        setNumberItem(numberItem+1);
        
    }
    function redItem(){
        if(numberItem == 1 ){
            
        }else{
            setNumberItem(numberItem-1);
           
            
        }
    }

    const setStorage=async ()=>{
        if(numberItem == 0)
        {
            return;
        }
        else
        {
            
            const ListProduct = await AsyncStorage.getItem('ListProduct');
            if(ListProduct==null){
                var newProduct={
                    products:[
                        {
                            "idProduct":product._id,
                            "name":product.name,
                            "price":product.price,
                            "discount":product.discount,
                            "numberItem":numberItem,
                        }
                    ]
                };
                AsyncStorage.setItem('ListProduct',JSON.stringify(newProduct));
            }
            else{
                var ListProductJson=JSON.parse(ListProduct);
                var isExist=0;
                for(let i=0;i<ListProductJson.products.length;i++){
                    if(ListProductJson.products[i].idProduct==product._id){
                        ListProductJson.products[i].numberItem+=numberItem;
                        isExist=1;
                        break;
                    }
                }
                if(isExist==0){
                    var newProduct={
                        "idProduct":product._id,
                        "name":product.name,
                        "price":product.price,
                        "discount":product.discount,
                        "numberItem":numberItem
                    };
                    ListProductJson.products.push(newProduct);
                }
                AsyncStorage.setItem('ListProduct',JSON.stringify(ListProductJson));
            }
            setNumberItem(0);
            setColor(['white','white','white','white']);
            globalAction.product.getNumberItemInCart();
        }
            
       
    }

    const parseMoney =  (value)=>{
        return value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];
    }
    
    const ratingCompleted=(rate)=>{
        axios.post(`${rootUrl}/vote`,{
            idUser:globalState.user._id,
            idProduct: product._id,
            numberStar:rate
        }).then(res => {
            globalAction.product.updateProduct(product._id);
            setMessage(res.data.message);
        })
        .catch(err => {
            console.log(`request fail ${err}`);
        })
    }

    useEffect(()=> {
        axios.get(`${rootUrl}/vote/san-pham?idUser=${globalState.user._id}&idProduct=${product._id}`)
        .then(res => {
            setRateUser(parseInt(res.data));
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    function parseDate(str)
    {
        const date = str.split('-');
        return `${date[2]}/${date[1]}/${date[0]}`
    }

    return (
      <View style={styles.container}>
        
            <View style={{alignItems:'center', marginHorizontal:30}}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>Giá: {parseMoney(product.price)} đ</Text>
                <Text style={styles.description}>
                    {product.description}



                    {/* xu ly */}
                </Text>
            </View>
            <View>
                <View style={styles.productInformationContainer}>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnLeft}>Giảm Giá:</Text>
                    </View>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnRight}>{product.discount}%</Text>
                    </View>
                </View>
                <View style={styles.productInformationContainer}>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnLeft}>Nơi sản xuất:</Text>
                    </View>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnRight}>{product.place}</Text>
                    </View>
                </View>
                <View style={styles.productInformationContainer}>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnLeft}>Ngày sản xuất:</Text>
                    </View>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnRight}>{parseDate(product.createDate)}</Text>
                    </View>
                </View>
                <View style={styles.productInformationContainer}>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnLeft}>Hạn sử dụng:</Text>
                    </View>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnRight}>{parseDate(product.expiryDate)}</Text>
                    </View>
                </View>
                <View style={styles.productInformationContainer}>
                    <View style={styles.productInformation}>
                        <Text style={styles.productInformationColumnRight}>{product.id}</Text>
                    </View>
                </View>
            </View>
            <Text style={{textAlign:"center"}}>Đánh giá trung bình cho sản phẩm</Text>
            <View style={styles.starContainer}>
                <Rating
                type='custom'
                ratingCount={5}
                imageSize={30}
                defaultRating={2}
                startingValue={product.rate}
                readonly={true}
                />
            </View>
            <Text  style={{textAlign:"center"}}>Đánh giá của bạn</Text>
            <View style={styles.starContainer}>
                <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                onFinishRating={(rate)=>ratingCompleted(rate)}
                defaultRating={2}
                startingValue={rateUser}
                />
            </View>
            <View style={styles.contentSize}>
                <TouchableOpacity style={styles.reduction} onPress={redItem}>
                    <Text>-</Text>
                </TouchableOpacity>
                <TextInput editable={false} style={styles.inputNumberItem} onChangeText={(value)=>{if(Number.isInteger(parseInt(value))  && parseInt(value)>0){setNumberItem(parseInt(value))}else{setNumberItem(0)}}} >
                    <Text>{numberItem}</Text>
                </TextInput>
                <TouchableOpacity  onPress={incItem} style={styles.increase}>
                     <Text>+</Text>
                </TouchableOpacity>
                  
            </View>
            <Text style={{alignSelf:'center',paddingTop:5}}>(Đơn vị: {dvt})</Text>
            <View style={styles.addToCarContainer}>
                <TouchableOpacity onPress={setStorage} style={styles.shareButton}>
                    <Text style={styles.AddButtonText}>Thêm Vào Giỏ</Text>  
                </TouchableOpacity>
            </View> 
            
            <View style={styles.commentContainer}>
                <ListComment pageComment = "SANPHAM" idPage={product._id}/>
            </View>
      </View>
    )
  
}

    