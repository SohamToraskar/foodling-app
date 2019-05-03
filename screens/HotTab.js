import React, { Component } from 'react';
import {  View, Text, ScrollView } from 'react-native';
import { Container, Title, Card, CardItem, Left, Right, Content, Thumbnail, Button } from 'native-base'
import DishList from '../components/DishList';
import Firebase from '../components/Firebase';
import * as firebase from 'firebase'
import AnimatedLoader from 'react-native-animated-loader';

class HotTab extends Component {


  constructor(props) {
    super(props)
  
    this.state = ({
      visible: true,
           
      dishList: [],

      dishTitles: '',
      dishPrice: '',
      dishPic: '',
      dishAbt: '',
      dishid: '',
      dishFcat: ''
    })
  };

  async getData(){
    setTimeout(() => {
      <Firebase />

      firebase.database().ref().child("hot").child(global.rest_id)
  .on("child_added", snapshot => {
    var hotname = snapshot.child("foodname").val()

  
   
   

  
  firebase.database().ref().child("dish")
  .on("child_added", snapshot => {
    var dname = snapshot.child("fname").val()
    var dprice = snapshot.child("fprice").val() 
    var fcat = snapshot.child("fcat").val()
    var dpic = snapshot.child("fdp").val()
    var rid = snapshot.child("rid").val()
    var abt = snapshot.child("fabout").val()
    var dstate = snapshot.child("state").val()
    var test = `${ dpic }`
   
   
    if (rid == global.rest_id && dname == hotname && dstate == "1") {
      
    this.setState({
      dishTitles: dname,
      dishPrice: dprice,
      dishPic: test,
      dishAbt: abt,
      dishid: rid,
      dishFcat: fcat
    })


    this.setState(prevState => ({
      dishList: [...prevState.dishList, <DishList 
        name={this.state.dishTitles}
        price={this.state.dishPrice}
        // pic={this.state.dishPic}
        pic={this.state.dishPic}
        abt={this.state.dishAbt}
        rating={4}
        fcat={this.state.dishFcat}
        rid={this.state.dishid}
        key={Math.random()}
    />]
    }))

  }
})

  setTimeout(() => {
    this.setState({ 
            visible: false,
          });
        },600)

      })

    }, 300)
  }



  async componentDidMount() {
   this.getData();

}


  
  render() {

    const { visible } = this.state;

    return (
      
        <View>
         <ScrollView scrollEventThrottle={16}>
            <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={{width: 100, height: 100}}
                speed={1}
                source={require("../assets/loader.json")}
              />

              <Text style={{color: 'white',fontSize: 20, textAlign: 'center', padding: 10,margin: 10, backgroundColor: '#FF6600'}}>Hot Dishes
                    </Text>
               {this.state.dishList}
          </ScrollView>
        </View>
    );
  }
}

export default HotTab;

