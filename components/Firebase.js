// @flow
import firebase from '@firebase/app';
import '@firebase/auth';
import React, { Component } from 'react'
import { Text, View } from 'react-native'

const firebaseConfig = {
    apiKey: "AIzaSyAU9mKK_zlKHvA0mlpYYAUp7WqWQBv1g4I",
    authDomain: "foodling-c8a88.firebaseapp.com",
    databaseURL: "https://foodling-c8a88.firebaseio.com",
    projectId: "foodling-c8a88",
    storageBucket: "foodling-c8a88.appspot.com",
    messagingSenderId: "845882170957"
};

firebase.initializeApp(firebaseConfig);




export default class Firebase extends Component {
  render() {
    return (
      <View>
        
      </View>
    )
  }
}
