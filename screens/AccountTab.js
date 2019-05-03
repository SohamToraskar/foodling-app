import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableNativeFeedback } from 'react-native';
import * as firebase from 'firebase'
import Firebase from '../components/Firebase'

class AccountTab extends Component {

  
  constructor(props) {
    super(props)
  
    this.state = ({
           
      restList: [],

      restName: '',
      restPic: '',
      restid: '',
      restPin: '',
      restAdd: ''
    })
  };

  async getData(){
    setTimeout(() => {
      

  
  firebase.database().ref().child("test").child("test1")
  .on("child_added", snapshot => {
    var rname = snapshot.child("name").val()

   
   
   
      
    this.setState({
        restName: rname,
        
    })

  
})
    }, 100)
  }



  async componentDidMount() {
   this.getData();

}




signOutUser() {
  firebase.auth().signOut();
  this.props.navigation.replace('Login')
}




  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{flex: 1}}>

          <Image style={styles.bgImage} source={require('../assets/profile_back.png')}/>
          
          <View style={{marginBottom: 0}}>
             <View style={styles.accountView}>         
                <Text style={styles.accountText}>
               Account
               </Text>
             </View>
            <View style={{flexDirection: 'row', marginTop: 65}}>
              <Image style={styles.profileImg} 
              source={require('../assets/3.jpg')}/>   
                <View>
                  <Text style={{ color: 'white', fontSize: 16, paddingLeft: 18, paddingTop: 37}}> {global.cust_name}
                  </Text>
                  <Text style={styles.accountInfo}> {this.state.phoneNumber}
                  </Text>
                </View>
            </View>
            <Text style={styles.pts}> Points: {this.state.points} {this.state.restName}
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('AccountAcc')}>
          <View style={styles.accountBtn}>
            <View style={styles.accountBtnmiddle}>
              <Image style={styles.icon1} source={require('../assets/ic_profile.png')}/>
              <Text style={styles.accountBtnText}>Account
              </Text>
            </View>
          </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Security')}>
          <View style={styles.accountBtn}>
            <View style={styles.accountBtnmiddle}> 
              <Image style={styles.icon2} source={require('../assets/ic_lock.png')}/>
              <Text style={styles.accountBtnText}>Security
              </Text>
            </View>
          </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('About')}>
          {/* <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Help',{name: this.state.restName,email: this.state.restEmail, address: this.state.restAdd,phone:this.state.restNo})}></TouchableNativeFeedback> */}
          <View style={styles.accountBtn}> 
            <View style={styles.accountBtnmiddle}>
              <Image style={styles.icon3} source={require('../assets/ic_help.png')}/>
              <Text style={styles.accountBtnText}>About
              </Text>
            </View>
          </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.signOutUser()}>
          <View style={styles.accountBtn}>
           <View style={styles.accountBtnmiddle}>
              <Image style={styles.icon4} source={require('../assets/ic_room.png')}/>
              <Text style={styles.accountBtnText}>Logout
              </Text>
            </View>
          </View>
          </TouchableNativeFeedback>
        </View>
      </View>

    );
  }
}

export default AccountTab;

const styles = StyleSheet.create({
  bgImage: {
    height: '100%', 
    width: '100%', 
    position: 'absolute', 
    resizeMode: 'cover'
  },
  icon1: {
    width: 23,
    height: 26,
    resizeMode: 'stretch',
    marginRight: 20,
    marginLeft: 20
  },
  icon2: {
    width: 24,
    height: 30,
    resizeMode: 'stretch',
    marginRight: 20,
    marginLeft: 20
  },
  icon3: {
    width: 24,
    height: 28,
    resizeMode: 'stretch',
    marginRight: 20,
    marginLeft: 20
  },
  icon4: {
    width: 25,
    height: 26,  
    resizeMode: 'stretch',
    marginRight: 20,
    marginLeft: 20
  },
  accountBtnText: {
    fontSize: 23,
    fontWeight: '500',
  },
  accountBtnmiddle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  accountBtn: {
    paddingVertical: 17,
    flex: 0.2,
    width: '60%',
    marginTop: 20,
    marginLeft:'20%',
    marginRight: '20%',
    borderRadius: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  pts: {
    color: 'white',
    fontSize: 20,
    paddingTop: 47,
    paddingLeft: 5
  },
  accountInfo: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 18,

  },
  accountText: {
    flex: 1,
    
    fontSize: 30, 
    color: 'white', 
    textAlign: 'center', 
    paddingTop: 5
  },
  accountView: {
    height: 60, 
    
     
    
    
  },
  profileImg: {
    width: 100, 
    height: 100, 
    borderRadius: 10, 
    borderColor: '#707070', 
    borderWidth: 1, 
    alignContent: 'center', 
    marginLeft: 12
    
  }
});