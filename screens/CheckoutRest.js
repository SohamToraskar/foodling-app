import React, { Component } from 'react'
import { View, Text, ScrollView ,Image,Dimensions,TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Container, Picker, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNUpiPayment from 'react-native-upi-payment';
import { withNavigation } from 'react-navigation'

var payment = [
  {label: "Cash on Delivery",value: "COD"},
  {label: "Online Payment", value: "Online_payment"}
  ];
  

export class CheckoutRest extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       address: 'restaurant',

       table: 'asdd',   
       selected: "nomusic",

       payment: '',
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
    const { navigation } = this.props;
    const total = navigation.getParam('total')
    var nameList = navigation.getParam('nameList')
    var priceList = navigation.getParam('priceList')
   
    var restid = navigation.getParam('rid')
   

 this.setState({
    total: total,
    priceList: priceList,
    nameList: nameList,
    rid: restid,
    
 })


}

onValueChange(value) {
  this.setState({
    selected: value
  });
}

static navigationOptions = {
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 }
    };

render() {
that=this;

function floo(){

    if (that.state.table.length != 3) {
      alert("check table number")
      return;
    }

    if (isNaN(that.state.table)) {
      alert("check table number")
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
        that.props.navigation.replace('Receipt',{txnId: that.state.txnId,payment: that.state.payment,total: that.state.total,nameList: that.state.nameList,priceList: that.state.priceList,rid: that.state.rid,table: that.state.table, music: that.state.selected,address: "restaurant",contact: "restaurant"})
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
        that.props.navigation.push('Receipt',{txnId: that.state.txnId,payment: that.state.payment,total: that.state.total,nameList: that.state.nameList,priceList: that.state.priceList,rid: that.state.rid,table: that.state.table, music: that.state.selected,address: "restaurant",contact: "restaurant"})
    }
        
    else{
        that.setState({Status:"FAILURE"})
}}

function successCallback(data){
    that.props.navigation.push('Reciept',{txnId: that.state.txnId,payment: that.state.payment,total: that.state.total,nameList: that.state.nameList,priceList: that.state.priceList,rid: that.state.rid,table: that.state.table, music: that.state.selected,address: "restaurant",contact: "restaurant"})
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
        <Text style={{fontSize: 20, marginTop: 10}}>Table:
        </Text>
     <Form>
      <Item>
       <Label style={{fontSize: 15}}>Enter 3 Digit Table Number: </Label>
       <Input
        style={{}}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={ table => that.setState({table})}
       />
       </Item>
       <Text style={{fontSize: 20, marginTop: 10}}>Music:
        </Text>
       <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.selected}
              maxLength={3}
              onValueChange={this.onValueChange.bind(this)}
              
            > 
              <Picker.Item label="Select" value="nomusic" />
              <Picker.Item label="Jazz" value="jazz" />
              <Picker.Item label="Blues" value="blues" />
              <Picker.Item label="Pop" value="pop" />
              <Picker.Item label="Techno" value="techno" />
            </Picker>
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

       <Text>Payment Status  {that.state.Status}
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
    </View>
  </View>
)
}
}

export default withNavigation(CheckoutRest);


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