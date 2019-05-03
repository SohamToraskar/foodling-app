import React, { Component } from 'react'
import { View, Text, ScrollView ,Image,Dimensions,TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNUpiPayment from 'react-native-upi-payment';
import { withNavigation } from 'react-navigation'
import { functions } from 'firebase';
import * as firebase from 'firebase'




var payment = [
    {label: "Cash on Delivery",value: "COD"},
    {label: "Online Payment", value: "Online_payment"}
    ];
    

export class Checkout extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
           address: '',
           payment: '',
           contact: '',
           

           Status: '',
           txnId: 'COD',
           nameList: [],
           priceList: [],
           fcatList: [],
           total: '',
           rid: ''
        };
      };

    async componentDidMount(){

        firebase.database().ref().child("customers").child(global.cust_name)
 .once("value", snapshot => {
   var address = snapshot.child("Address").val() 
   var phone = snapshot.child("Phone").val()   
  
   this.setState({
    address: address,
    contact: phone
    })
   
 
   })

        
        const { navigation } = this.props;
        const total = navigation.getParam('total')
        var nameList = navigation.getParam('nameList')
        var priceList = navigation.getParam('priceList')
        var fcatList = navigation.getParam('fcatList')
        var restid = navigation.getParam('rid')
       

     this.setState({
        total: total,
        priceList: priceList,
        nameList: nameList,
        rid: restid,
     
     })

    
 }
 

 stats(){

   

    firebase.database().ref("customers").child(global.cust_name)
        .update({
            
            Address: this.state.address,
            Phone: this.state.contact
        })

        
}


   static navigationOptions = {
        headerTransparent: true,
        headerStyle: { borderBottomWidth: 0 }
        };

   

  render() {
    that=this;

    

    function floo(){

        if (that.state.address.length < 14) {
            alert("Enter Correct Address")
            return;
        }

        if (that.state.contact.length != 10) {
            alert("Re-check Contact no.")
            return;
        }

        if (isNaN(that.state.contact) || that.state.contact.length != 10) {
            alert("Re-check Contact no.")
            return;
        }

        

        if (that.state.payment == "Online_payment") {
            RNUpiPayment.initializePayment({
                vpa: '9823944222@paytm',
                payeeName: 'Soham Toraskar',
                amount: '1',
                transactionRef: 'some-random-id'
            },successCallback,failureCallback);
        }
        else if(that.state.payment == "COD"){
            that.props.navigation.replace('Receipt',{txnId: that.state.txnId,payment: that.state.payment,total: that.state.total,nameList: that.state.nameList,priceList: that.state.priceList,rid: that.state.rid,address: that.state.address,table: "null", music: "null",contact: that.state.contact})
           
            that.stats();
        }
        else{
            alert("Please select Payment Method")
            return;
        }
    }

    function failureCallback(data){
        if(data['Status']=="SUCCESS"){
            that.setState({Status:"SUCCESS"});
            that.setState({txnId:data['txnId']})
            that.props.navigation.push('Receipt',{txnId: that.state.txnId,payment: that.state.payment,total: that.state.total,nameList: that.state.nameList,priceList: that.state.priceList,rid: that.state.rid,address: that.state.address,table: "null", music: "null",contact: that.state.contact})
            
            that.stats();
        }
            
        else{
            that.setState({Status:"FAILURE"})
    }}

    function successCallback(data){
        that.props.navigation.push('Reciept',{txnId: that.state.txnId,payment: that.state.payment,total: that.state.total,nameList: that.state.nameList,priceList: that.state.priceList,rid: that.state.rid,address: that.state.address,table: "null", music: "null",contact: that.state.contact})
        
        that.stats();
    }

   
    
    return (
      <View style={{paddingLeft: 30}}>

        <View> 
            <Text style={{fontSize: 40, paddingTop: 40, paddingLeft: 10, marginBottom: 10}}>Checkout
            </Text>            
        </View>

        <View style={{borderColor: '#e5dede', borderWidth: 1,width: '90%', padding: 6}}>
            <Text style= {{fontSize: 20}}>Total Amount to be payed:
            </Text>
            <Text style= {{fontSize: 27}}>{that.state.total}
            </Text>
        </View>

        <View>
            <Text style={{fontSize: 20, marginTop: 10}}>Delivery:
            </Text>
         <Form>
          <Item>
           <Label style={{fontSize: 15}}>Enter Address:</Label>
           <Input
            style={{}}
            autoCorrect={false}
            autoCapitalize="none"
            
            onChangeText={ address => that.setState({address})}
            value={this.state.address}
           />
           </Item>
           <Item>
           <Label style={{fontSize: 15}}>Enter Contact:</Label>
           <Input
            style={{}}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={ contact => that.setState({contact})}
            value={this.state.contact}
           />
           </Item>
          </Form>
        </View>

        <View>
          
            <Text style={{fontSize: 20,marginTop: 15, marginBottom: 5}}>Payment Method:
            </Text>
            <View style={{borderColor: '#e5dede', borderWidth: 1,width: '90%', padding: 10, marginBottom: 20}}>

                <RadioForm 
                    radio_props={payment}
                    initial={"COD"}
                    onPress={(value) => {that.setState({payment:value})}}
                    buttonSize={10}
                    animation={true}
                    buttonColor={'#d35400'}
                    labelStyle={{fontSize: 17, color: '#9e9999'}}
                    selectedButtonColor={'#d35400'}
                />
           </View>

           <Text>Payment Status:  {that.state.Status}
           </Text>
        </View>

        
        <View>
        <Button style={styles.button}
                full              
                success
                onPress={()=>floo()}
                >  
                <Text style={styles.loginText}>Place Order</Text>
             </Button>

        <Button style={styles.button}
                full              
                success
                onPress={() => that.props.navigation.push('CheckoutRest',{total: that.state.total,nameList: that.state.nameList, priceList: that.state.priceList, rid: that.state.rid})}
                >  
                <Text style={styles.loginText}>E-Menu Case</Text>
            </Button>
        </View>
      </View>
    )
  }
}

export default withNavigation(Checkout);


const styles = StyleSheet.create({

    button: {
        margin: 10,
        backgroundColor: '#d35400',
        width: 130,
        marginHorizontal: '55%',
        borderRadius: 4,
      },
      loginText: {
        color: 'white',
        fontSize: 16,
      },
   
  });