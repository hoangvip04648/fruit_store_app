import React,{useState} from 'react';
import Login from '../components/login/login';

export const LoginScreen = (props) => {
    const {navigation} = props;
    return (
        <Login navigation={navigation}/>
    )
}
