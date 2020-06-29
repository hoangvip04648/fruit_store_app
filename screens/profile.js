import React,{Component} from 'react';
import {View} from 'react-native'
import Profile from '../components/profile/profile';

 export const ProfileScreen= (props) => {
    const {navigation} = props;
    return (
            <Profile navigation={navigation}/>
    )
}

