
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import { Firebase } from '../components/Firebase'
import firebase from '@firebase/app';
import '@firebase/auth';







export default class LoginScreen extends Component {
  
  
  componentWillMount() {
    <Firebase />
  }
  
    
  static navigationOptions = {
      
  };

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: '',
      errorMessage: 'Please enter Details',
      Name: 'test'

    })
  }

    // signUpUser = (email, password) => {

    //   try {

        
    //     if (this.state.password.length < 6){
    //     alert("please enter atleast 6 characters")
    //     return;
    //     }

    //     else if(this.state.name.length < 8 )
    //     {
    //     alert("please enter full name")
    //     return;
    //     }


    //   firebase.auth().createUserWithEmailAndPassword(email, password)
      
    // }

    //     catch (error) {
    //       console.log(error.toString())
    //     }
    //   }

  signUpUser = (email, password, Name) => {

  

    if (!isNaN(Name)){
      alert("test")
      return;
      }

    if (password.length < 6){
      alert("Password must be atleast 6 characters")
      return;
      }

      if (Name.length < 8 ){
        alert("Name must be atleast 6 characters")
        return;
        }

        if (email.length < 14 ){
          alert("Ckeck Email")
          return;
          }

      


    firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
      
      if (this.state.errorMessage != 'Please enter Details') {
        alert(this.state.errorMessage)
        this.state.errorMessage = 'Please enter Details'
      } else {
        var Femail = email.replace('.',',')
        var key = firebase.database().ref('/customers').child(Femail)
          key.set({
            Name: Name,  
            Email: email,
        
        });
      }

      
      
  }


  // sendDetails(email, Name){
  //   if (condition) {
      
  //   }
  //   var key = firebase.database().ref('/customers').child(Name)
  //   key.set({
  //     Name: Name,  
  //     Email: email,
        
  //   });
    
  // }

  static navigationOptions = {
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 }
    };



  render() {
    return (
      <Container style={styles.container}>
        <Form>
        <Item floatingLabel style={styles.label}>
          <Label style={styles.label}>Name</Label>
          <Input
            style={styles.loginText}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={ Name => this.setState({Name})}
          />
         </Item>
                  
         <Item floatingLabel style={styles.label}>
          <Label style={styles.label}>Email</Label>
          <Input
            style={styles.loginText}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={ email => this.setState({email})}
          />
         </Item>
         <Item floatingLabel style={styles.label}>
          <Label style={styles.label}>Password</Label>
          <Input style={styles.loginText}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={ password => this.setState({password})}
          />
         </Item>
                  
         <Button style={styles.button}
         full
         rounded
         success
         onPress={() => this.signUpUser(this.state.email, this.state.password,this.state.Name)}
        //  onPress={() => this.sendDetails(this.state.email, this.state.Name)}
         >  
          <Text style={styles.loginText}>Sign Up</Text>
         </Button>
        </Form>
      </Container>
    );
  }

  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ff7e28',    
  },
  label: {
    paddingBottom: 10,
    color: 'white',
  },
  button: {
    margin: 10,
    backgroundColor: '#d35400',
    width: '40%',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  }

});
