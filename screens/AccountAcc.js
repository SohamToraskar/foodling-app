import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableNativeFeedback } from 'react-native';
import * as firebase from 'firebase'
import Firebase from '../components/Firebase'

export default class AccountTab extends Component {

  constructor(props) {
    super(props)
  
    this.state = ({
      address: '',
      contact: '',
      name: ''
      
    })
  };

  async getData(){
    setTimeout(() => {
      
      firebase.database().ref().child("customers").child(global.cust_name)
      .once("value", snapshot => {
        var address = snapshot.child("Address").val() 
        var phone = snapshot.child("Phone").val() 
        var name = snapshot.child("Name").val()  
       
        this.setState({
         address: address,
         contact: phone,
         name: name
         })
        
      
        })

    }, 100)
  }



  async componentDidMount() {
   this.getData();

}




static navigationOption={
  headerTransparent: true,
  headerStyle: { borderBottomWidth: 0 },
  headerLeft: null
}
  

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.8}}>
        <Image style={styles.bgImage} source={require('../assets/profile.jpg')}/>
        </View>

        <View style= {{flex: 1, paddingTop: 20, padding: 30}}>

            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Name :
            </Text>
            <Text style={{fontSize: 18,marginBottom: 10}}> {this.state.name}
            </Text>

            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Email id :
            </Text>
            <Text style={{fontSize: 18,marginBottom: 10}}> {global.cust_name}
            </Text>

            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Contact Number :
            </Text>
            <Text style={{fontSize: 18,marginBottom: 10}}> {this.state.contact}
            </Text>

            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Address :
            </Text>
            <Text style={{fontSize: 18,marginBottom: 10}}> {this.state.address}
            </Text>

            <Text style={{fontSize: 16}}> Note:
            </Text>
            <Text style={{fontSize: 13,marginBottom: 10}}> Note: You change Address and Contact number while ordering. 
            </Text>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    height: '100%', 
    width: '100%', 
    position: 'absolute', 
    resizeMode: 'cover'
  }

});
