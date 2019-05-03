
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import { Firebase } from '../components/Firebase'
import '@firebase/auth';
import * as firebase from 'firebase';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';




export default class LoginScreen extends Component {

  

  componentWillMount() {
    <Firebase />
  }
  
    
  static navigationOptions = {
      header: null
  };

  constructor(props) {
    super(props)
    

    this.state = ({
      email: '',
      password: '',
      errorMessage: 'nothing'
    })  
    
  };

  

  signUpUser = (email, password) => {

    try {
      if (this.state.password.length < 6){
      alert("please enter atleast 6 characters")
      return;
    }
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    
  }

  catch (error) {
    console.log(error.toString())
  }
}


//   loginUser = (email, password) => {
//     try {
//       firebase.auth().signInWithEmailAndPassword(email,password).then(function (user){
//         console.log(user)
//       })
//     }
//     catch (error) {
//       console.log(error.toString())
//     }
//   }

  loginUser = (email, password) => {
    
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.replace('Restaurants'))
      .catch(() => alert("Incorrect Details"))
    
    
    
  }

  forgot(email){

    firebase.auth().sendPasswordResetEmail(email).then(function() {
      alert("Email has been sent")
    }).catch(function(error) {
      alert("Check Email")
    });
  }

  static navigationOptions = {
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 }
    };


  render() {
    
       cust_name = this.state.email.replace('.',',')
      
    return (
      <Container style={styles.container}>
        <Form>
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
         <TouchableNativeFeedback onPress={() => this.forgot(this.state.email)}> 
         <Text style={{fontSize: 17, margin: 12, color: 'white'}}> Forgot Password?
         </Text>
         </TouchableNativeFeedback>
         <Button style={styles.button}
         full
         rounded
         success
         onPress={() => this.loginUser(this.state.email, this.state.password)}
         >  
          <Text style={styles.loginText}>Login</Text>
         </Button>

         <Button style={{width: '40%', margin: 10}}
         full
         rounded
         primary

         onPress={() => this.props.navigation.navigate('Register')}
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
