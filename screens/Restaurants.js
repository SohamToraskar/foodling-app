import React, { Component } from 'react';
import { View, Text, ScrollView,Image,TouchableNativeFeedback, Dimensions, BackHandler,Alert } from 'react-native';
import { Container, Title, Card, CardItem, Left, Right, Content, Thumbnail, Button } from 'native-base'
import * as firebase from 'firebase'
import RestList from '../components/RestList'
import { withOrientation } from 'react-navigation';
import AnimatedLoader from 'react-native-animated-loader';


class Restaurants extends Component {

    constructor(props) {
        super(props)
      
        this.state = ({
          visible: true,
               
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
          
    
      
      firebase.database().ref().child("main").child("restid")
      .on("child_added", snapshot => {
        var rname = snapshot.child("restname").val()
        var rpin = snapshot.child("pincode").val() 
        var rpic = snapshot.child("dp").val()
        var rid = snapshot.child("restid").val()
        var rstate = snapshot.child("state").val()
        var rrstate = snapshot.child("rstate").val()
        var raddress =snapshot.child("address").val()
        var test = `${ rpic }`
       
       
        if (rstate == "1" && rrstate == "1") {
          
        this.setState({
            restName: rname,
            restPic: test,
            restid: rid,
            restPin: rpin,
            restAdd: raddress
        })
    
    
        this.setState(prevState => ({
          restList: [...prevState.restList, <RestList 
            name={this.state.restName}
            pic={this.state.restPic}
            pin={this.state.restPin}
            rid={this.state.restid}
            add={this.state.restAdd}
            key={Math.random()}
        />]
        }))
    
      }
    })

    setTimeout(() => {
      this.setState({ 
              visible: false,
            });
          },1000)

        }, 100)
      }
    
    
    
      async componentDidMount() {

        
       this.getData();
    
    }

  
  
  

  render() {

    const { visible } = this.state;
    
    return (
      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      
      <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={{width: 100, height: 100}}
          speed={1}
          source={require("../assets/loader.json")}
        />

      <Text style={{color: 'white',fontSize: 20, textAlign: 'center', padding: 10,margin: 10, backgroundColor: '#FF6600'}}>Select Restaurant
      </Text>
       <ScrollView scrollEventThrottle={16} style={{}}>
        <View style={{marginHorizontal: '22%'}}>

        {this.state.restList}
        
        </View>
      </ScrollView>
      </View>
    );
  }
}

export default Restaurants;
