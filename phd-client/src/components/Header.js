import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { logout } from '../actions/authActions';
import Button from './Button';


 export default ({navigation}) => {
  return {
  title: 'Patient Health Database',
  headerStyle: {
      backgroundColor: '#1F978B',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
    headerRight: (
      <Button
        label="Logout"
        styles={{button: { padding: 0 }, label: { fontSize: 20, color: '#BCBDC6' } }}
        onPress={()=>{
          navigation.navigate('Auth');
          logout();
        }}
      />
    ),
  }
  };
