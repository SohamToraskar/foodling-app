import React, { Component } from 'react'
import { View, Text, ScrollView ,Image,Dimensions,TouchableNativeFeedback, StyleSheet,BackHandler } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNUpiPayment from 'react-native-upi-payment';
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'

class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
        orderId: Math.floor((Math.random() * 100000) + 1),

        nameList: [],
        priceList: [],
      
        total: '',
        payment: '',
        rid: '',
        txnId: '',
        address: 'restaurant',
        music: 'null',
        table: 'null',
        contact: 'null'
    };
  }

  

  async componentDidMount(){

    BackHandler.addEventListener('hardwareBackPress', function(){
      return true;
    });
    
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    const { navigation } = this.props;
    const payment = navigation.getParam('payment')
    const total = navigation.getParam('total')
    const txnid = navigation.getParam('txnId')
    var nameList = navigation.getParam('nameList')
    var priceList = navigation.getParam('priceList')
    const restid = navigation.getParam('rid')
    const address = navigation.getParam('address')
    const music = navigation.getParam('music')
    const table = navigation.getParam('table')
    const contact = navigation.getParam('contact')
    const date = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

 this.setState({
    total: total,
    payment: payment,
    priceList: priceList,
    nameList: nameList,
    rid: restid,
    address: address,
    txnId: txnid,
    music: music,
    contact: contact,
    table: table
 })
  
 var ref = firebase.database().ref('/orders').child(this.state.orderId)
 firebase.database().ref('/orders').child(this.state.orderId).set({
  orderid: this.state.orderId,
  rid: global.rest_id,
  txnId: txnid,
  customer: global.cust_name,
  address: address,
  contact: contact,
  music: music,
  state: "0",
  total: total,
  table: table,
  date: date
})


     for (let i = 0; i < nameList.length; i++) {
         ref.push({
            name: nameList[i],
            price: priceList[i],
            total: total,
            

         })
         
     }

     for (let i = 0; i < nameList.length; i++) {

         
         firebase.database().ref().child("stats").child(global.rest_id).child(nameList[i]).push({
          
          name: nameList[i]
          
        })

       

         
          firebase.database().ref().child("dish").child(nameList[i]).child("hot").push({
           
           name: nameList[i]
           
         })
         

      }

     
     

  firebase.database().ref().child("cart").child(global.cust_name).remove();
     this.render();
    

 }

 static navigationOptions = {
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 },
    
    };


  render() {
    return (
        <View style={{paddingLeft: 30}}>

        <View> 
            <Text style={{fontSize: 40, paddingTop: 40, paddingLeft: 10, marginBottom: 10}}>Order Placed 
            </Text>            
        </View>        
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <View>
            <Icon name="md-checkmark-circle-outline" color="#d35400" size={70} />
            </View>

            <View>
                <Text style={{fontSize: 24, marginTop: 14,marginLeft: 10}}>Order #: {this.state.orderId}
                </Text>
                
            </View>
          </View>
          <Text style={{fontSize: 16, margin: 10}}>Thank You {global.cust_name}!
                </Text>
        <View style={{borderColor: '#e5dede', borderWidth: 1,width: '90%', padding: 6}}>
            <Text style= {{fontSize: 20}}>Total Amount:
            </Text>
            <Text style= {{fontSize: 27}}>{this.state.total}
            </Text>
        </View>
        <View>
          
            <Text style={{fontSize: 20,marginTop: 15, marginBottom: 5}}>Payment Method: {this.state.payment}
            </Text>

          
           <Text style={{fontSize: 20}}>TXN ID:
           </Text>
           <Text style={{fontSize: 12}}>Note: only for online payment
           </Text>
           <Text style={{fontSize: 15}}>{this.state.txnId}
           </Text>
        </View>

        
        <View>
        <Button style={styles.button}
                full           
                success
                onPress={()=> this.props.navigation.navigate('Home')}             
                >  
                <Text style={styles.loginText}>Home</Text>
             </Button>
        </View>
      </View>
    );
  }
}

export default withNavigation(Receipt);


const styles = StyleSheet.create({

    button: {
        margin: 10,
        backgroundColor: '#d35400',
        width: 130,
        marginHorizontal: '20%',
        borderRadius: 4,
      },
      loginText: {
        color: 'white',
        fontSize: 16,
      },
   
  });