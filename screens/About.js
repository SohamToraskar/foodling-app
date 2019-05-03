import React, { Component } from 'react';
import { View, Text, ScrollView,StyleSheet,Image,TouchableNativeFeedback, Dimensions } from 'react-native';
import { Container, Title, Card, CardItem, Left, Right, Content, Thumbnail, Button } from 'native-base'
import * as firebase from 'firebase'
import Firebase from '../components/Firebase'


export default class Help extends Component {

    constructor(props) {
        super(props)
    
        this.state = ({
          restList: [],
    
          restName: '',
          restPic: '',
          restid: '',
          restPin: '',
          
          restEmail: '',
          restNo: '98198198191',
          restAdd: '',
        })
      }
      async getData(){
        setTimeout(() => {
          
    
      
      firebase.database().ref().child("main").child("restid")
      .on("child_added", snapshot => {
        var rname = snapshot.child("restname").val()
        var rpin = snapshot.child("pincode").val() 
        var rpic = snapshot.child("dp").val()
        var rid = snapshot.child("restid").val()
        var rstate = snapshot.child("state").val()
        var raddress =snapshot.child("address").val()
        var remail =snapshot.child("email").val()
        var test = `${ rpic }`
       
       
        if (rstate == "1") {
          
        this.setState({
            restName: rname,
            restPic: test,
            restid: rid,
            restPin: rpin,
            restAdd: raddress,
            restEmail: remail
        })
    
    
        // this.setState(prevState => ({
        //   restList: [...prevState.restList, <RestList 
        //     name={this.state.restName}
        //     pic={this.state.restPic}
        //     pin={this.state.restPin}
        //     rid={this.state.restid}
        //     add={this.state.restAdd}
        //     key={Math.random()}
        // />]
        // }))
    
      }
    })
        }, 100)
      }
      
      
      async componentDidMount() {

       this.getData();
      
      }
      

  render() {
      
    return (
        <View style={{flex: 1}}>
        <View style={{flex: 0.8}}>
        <Image style={styles.bgImage} source={require('../assets/help.png')}/>
        </View>

        <View style= {{flex: 1, paddingTop: 20, paddingLeft: 30}}>

            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Name :
            </Text>
            <Text style={{fontSize: 18,marginBottom: 10}}> {this.state.restName}
            </Text>

            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Email id :
            </Text>
            <Text style={{fontSize: 18,marginBottom: 10}}> {this.state.restEmail}
            </Text>

            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Contact Number :
            </Text>
            <Text style={{fontSize: 18,marginBottom: 10}}> {this.state.restNo}
            </Text>

            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Address :
            </Text>
            <Text style={{fontSize: 18,marginBottom: 10}}> {this.state.restAdd}
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
