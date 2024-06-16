// AuthNavigation.js
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from './component/Contexts/Context';
import { loginStatus } from '../../src/Home/Login/LoginAction';
import { useSelector } from 'react-redux';

const AuthNavigation = ({ component: Component, ...props }) => {
    const navigation = useNavigation();


    
    // useEffect(() => {
    //     loginStatus().then((res) => {
    //         if(!res){
    //             navigation.navigate('home', { headerTitle: "Home", id: 1 });
    //         }
    //     })
    // }, [])

    const {user} = useSelector((state)=>state);
    useEffect(() => {
      console.log(user?.loginData == null ||  user?.loginData?.success === undefined , "sfjfdbgdf nfg nsdfnsd sdnb ")
      if(user?.loginData == null ||  user?.loginData?.success === false){
        navigation.navigate('home', { headerTitle: "Home", id: 1 })
      }
  
    }, []);

    return <Component {...props} />;
};

export default AuthNavigation;
