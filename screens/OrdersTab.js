import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image, TouchableNativeFeedback, ScrollView,RefreshControl } from 'react-native'
import { Container, Title, Card, CardItem, Left, Right, Content, Thumbnail, Button, Subtitle, Icon, Input, Item } from 'native-base'
import * as firebase from 'firebase'
import { withNavigation } from 'react-navigation'
import OrderList from '../components/OrderList'
import AnimatedLoader from 'react-native-animated-loader';


class OrdersTab extends Component {

  constructor(props) {
    super(props)
  
    this.state = ({
      refreshing: false,
      visible: true,
           
      totalPrice: 0,

      orderList: [],
      customer: '',
      date: '',
      orderid: '',
      state: '',
      txnid: '',
      totalPrice: 0,
    })
    

  }

  async getData(){
    
    setTimeout(() => {
      // <Firebase /> 
  
  firebase.database().ref().child("orders")
  .on("child_added", snapshot => {
    var customer = snapshot.child("customer").val()
    var date = snapshot.child("date").val()
    var orderid = snapshot.child("orderid").val()
    var state = snapshot.child("state").val()
    var total = snapshot.child("total").val()
    var txnid = snapshot.child("txnId").val()
    

    if (customer == global.cust_name) {
      
    
   
    this.setState({
      customer: customer,
      date: date,
      orderid: orderid,
      state: state,
      txnid: txnid,
      totalPrice: total
    })
  
    this.setState(prevState => ({
      orderList: [...prevState.orderList, <OrderList 
        date={this.state.date}
        orderid={this.state.orderid}
        state={this.state.state}
        total={this.state.totalPrice}
        txnid={this.state.txnid}
        
        key={Math.random()}
    />]
    }))
    
  }
  
  })
        setTimeout(() => {
          this.setState({ 
                  visible: false,
                });
              },800)

    }, 100)

    
  }
  
  async componentDidMount() {
    this.getData();
    
 }

 _onRefresh = () => {
  this.setState({orderList: []});

  this.setState({refreshing: true});
  this.getData().then(() => {
    this.setState({refreshing: false});
  });
}


  render() {

    const { visible } = this.state;

    return (
      <View style={ {flex : 1}}>
        <Text style={{textAlign: 'center', fontSize: 16, margin: 5}}>Pull Down to Refresh
          </Text>

      <AnimatedLoader
                      visible={visible}
                      overlayColor="rgba(255,255,255,0.75)"
                      animationStyle={{width: 100, height: 100}}
                      speed={1}
                      source={require("../assets/loader.json")}
                    />

       <ScrollView scrollEventThrottle={16}refreshControl={
                    <RefreshControl
                       
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
        
        {this.state.orderList}

        
       </ScrollView>
      </View>
    );
  }
}

export default OrdersTab;
