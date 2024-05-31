// AuthNavigation.js
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from './component/Contexts/Context';
import { loginStatus } from '../../src/Home/Login/LoginAction';

const AuthNavigation = ({ component: Component, ...props }) => {
    const navigation = useNavigation();

    useEffect(() => {
        loginStatus().then((res) => {
            console.log(res , "gdfhf")
            if(!res){
                navigation.navigate('home', { headerTitle: "Home", id: 1 });
            }
        })
    }, [])

    return <Component {...props} />;
};

export default AuthNavigation;
