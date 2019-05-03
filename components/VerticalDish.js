import React, { Component } from 'react';
import { View, Text, ScrollView,Image,Dimensions,TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from 'firebase';
import { withNavigation } from 'react-navigation';

class VerticalDish extends Component {

  render() {
    return (
              <TouchableNativeFeedback onPress={() => this.props.navigation.push('Dish', {name: this.props.dishName, price: this.props.price, pic: this.props.dishUri, about: this.props.abt,fcat: this.props.fcat})}>
                    <View style={{height: 130, width: 130, marginLeft:10,borderWidth:0.5,borderRadius: 5, borderColor:'#dddddd', elevation: 1}}>
                      
                        <View style={{flex: 2}}>
                          <Image source={{uri: `${this.props.dishUri}`}} style={{flex: 1, width:null, height:null, resizeMode: 'cover'}}/>
                        </View>
                        <View style={{flex: 1, paddingLeft:10, paddingTop:2}}>
                         
                          <Text style={{fontSize: 12}}>{this.props.dishName}</Text>
                          
                        </View>
                      
                    </View>
              </TouchableNativeFeedback>
    );
  }
}


export default withNavigation(VerticalDish);