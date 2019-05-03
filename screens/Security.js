import React, { PureComponent } from 'react';
import {  View, Text, StyleSheet, Image } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase'

export default class Security extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
    };
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateAndRetrieveDataWithCredential(cred);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(this.state.newPassword).then(() => {
        alert("Password was changed");
      }).catch((error) => { alert(error.message); });
    }).catch((error) => { alert(error.message) });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.8}}>
        <Image style={styles.bgImage} source={require('../assets/security.png')}/>
        </View>

        <View style= {{flex: 1, paddingTop: 20, paddingLeft: 30}}>
        <Text style={{fontSize: 20}}> Change password?
        </Text>
        <Form>
          <Item floatingLabel style={{paddingBottom: 2, color: 'white'}}>
          <Label style={styles.label}>Current password</Label>
          <Input style={styles.loginText}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={ (password) => {this.setState({currentPassword: password})}}
          />
          </Item>

          <Item floatingLabel style={{color: 'white'}}>
          <Label style={styles.label}>New password</Label>
          <Input style={styles.loginText}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={ (password) => {this.setState({newPassword: password})}}
          />
          </Item>

          <Button style={{ margin: 10, marginRight:30, marginTop: 20}}
          full
          rounded
          primary
          //  onPress={() => this.signUpUser(this.state.email, this.state.password)}
          onPress={this.onChangePasswordPress}
          >  
          <Text style={styles.btnText}>Change password</Text>
         </Button>
        </Form>
          
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
  },
  loginText: {
    
  },
  label: {
    fontSize: 14
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  }

});