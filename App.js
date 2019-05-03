
import React, { Component } from 'react';
import { Firebase } from './components/Firebase'
import '@firebase/auth';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'
import Home from './screens/Home'
import Dinner from './screens/Dinner'
import AccountAcc from './screens/AccountAcc'
import Security from './screens/Security'
import About from './screens/About'
import Dish from './screens/Dish'
import Checkout from './screens/Checkout'
import CheckoutRest from './screens/CheckoutRest'
import Receipt from './screens/Receipt'
import CartTab from './screens/CartTab'
import Restaurants from './screens/Restaurants'


<Firebase />


const AppSwitchNavigator = createStackNavigator({
  Login:{screen: LoginScreen},
  Register: {screen: RegisterScreen},
  Restaurants: {screen: Restaurants, navigationOptions: {
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 },
    headerLeft: null
  }},
  Dinner: {screen: Dinner},
  Dish: {screen: Dish},
  CheckoutRest: {screen: CheckoutRest},
  Checkout: {screen: Checkout},
  Receipt: {screen: Receipt, navigationOptions: {
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 },
    headerLeft: null
  }},
  CartTab: {screen: CartTab, navigationOptions: {
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 },
    headerLeft: null
  }},
  AccountAcc: {screen: AccountAcc, 
    navigationOptions: {
      title: 'Account'
    }},
  About: {screen: About, 
    navigationOptions: {
      title: 'About'
    }},
  Security: {screen: Security,
    navigationOptions: {
      title: 'Security'
    }},
  Home:{screen:Home,
    navigationOptions: {
      header:null
    }
  },
},{
  initialRouteName:'Login',
});


const AppContainer = createAppContainer(AppSwitchNavigator);

export default  AppContainer;


