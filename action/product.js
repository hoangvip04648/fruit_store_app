import axios from 'axios';
import {rootUrl} from '../config';
import {AsyncStorage} from 'react-native'
export const getListProduct = (store) => {
    return new Promise((resolve,reject) => {
        axios.get(`${rootUrl}/san-pham?amount=8`)
        .then(res => {
            store.setState({products:res.data.products});
             resolve(res.data.products);
        })
        .catch(err => {
          reject(err);
        });
    })
}

export const parseMoney =  (value)=>{
    return value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const updateProduct = (store,idProduct) => {
    axios.get(`${rootUrl}/san-pham/`+idProduct)
    .then(res => {
        let newProducts = store.state.products.filter(item => item._id !=idProduct);
        newProducts.unshift(res.data);
        store.setState({products:newProducts});
       
    })
    .catch(err => {
        console.log(err);
    })
}

export const changeNumberItemCart = (store)=>{
    AsyncStorage.removeItem('ListProduct');
    store.setState({numberItem:0});
}

export const getNumberItemInCart = (store) => {
    AsyncStorage.getItem('ListProduct')
    .then(products => {
        if(products != null)
        {
           store.setState({numberItem: JSON.parse(products).products.length});
        }
    })
    .catch(err => {
        console.log(err);
    })
}

