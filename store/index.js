import React from 'react';
import {AsyncStorage} from 'react-native';
import useGlobalHook from 'use-global-hook';
import * as action from '../action';

let initialState = {
    status:'',//LOADING OR SUCCESS OR FAIL
    isLogin:false, //TRUE OR FALSE
    user:{
        id : '',
        token: '',
        avatar: '',
        isActive: true,
        email:'',
        phoneNumber: '',
        name:'',
        address:'',
        gender:''
    },
    alert:'',
    products:[],
    numberItem:0
}

const useGlobal = useGlobalHook(React,initialState,action);

export default useGlobal;