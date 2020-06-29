import React,{Component} from 'react';
import ChangeProfile from '../components/profile/change-profile';

 export const ChangeProfileScreen= (props) => {
    const {navigation} = props;
    return (
        <ChangeProfile navigation={navigation}/>
    )
}

