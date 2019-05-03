import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import HomeTab from './HomeTab';
import OrdersTab from './OrdersTab';
import CartTab from './CartTab';
import AccountTab from './AccountTab';
import HotTab from './HotTab';
import Icon from 'react-native-vector-icons/Ionicons'


class Home extends Component {
  
constructor(props) {
  super(props)

  this.state = ({
    restid: '',

  })
};

componentDidMount(){

  const { navigation } = this.props;
  const rid = navigation.getParam('rid')

  this.setState({
    restid: rid
  })
}
  render() {

    rest_id = this.state.restid
    
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}








export default createBottomTabNavigator({
  
  Home: {
    screen:HomeTab,
    navigationOptions : {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-home" color={tintColor} size={24} />
      )
    }
  },
  Hot: {
    screen:HotTab,
    navigationOptions : {
      tabBarLabel: 'Hot',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-flame" color={tintColor} size={24} />
      )
    }
  },
  // Cart: {
  //   screen:CartTab,
  //   navigationOptions : {
  //     tabBarLabel: 'Cart',
  //     tabBarIcon: ({tintColor}) => (
  //       <Icon name="md-cart" color={tintColor} size={24} />
  //     )
  //   }
  // },
  
  Orders: {
    screen:OrdersTab,
    navigationOptions : {
      tabBarLabel: 'Orders',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-book" color={tintColor} size={24} />
      )
    }
  },
  Account: {
    screen:AccountTab,
    navigationOptions : {
      tabBarLabel: 'Account',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-person" color={tintColor} size={24} />
      )
    }
  }
},{
  tabBarOptions: {
    activeTintColor: '#FF6600',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      shadowOffset: {width: 5, height: 3},
      shadowColor: 'black',
      shadowOpacity: '0.5',
      elevation: 5
    }
  }
})