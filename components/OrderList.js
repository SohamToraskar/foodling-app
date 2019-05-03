import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image, TouchableNativeFeedback, ScrollView } from 'react-native'
import { Container, Title, Card, CardItem, Left, Right, Content, Thumbnail, Button, Subtitle, Icon, Input, Item, Body, Row } from 'native-base'
import * as firebase from 'firebase'
import { withNavigation } from 'react-navigation'




class OrderList extends Component {
    constructor(props) {
        super(props)
      
        this.state = ({
               
          date: '',
          orderid: '',
          state: '',
          txnid: '',
          total: 0,

         
        })
      };

   async componentDidMount(){

     

     this.setState({
          date: this.props.date,
          orderid: this.props.orderid,
          state: this.props.state,
          txnid: this.props.txnid,
          total: this.props.total
     })

     if (this.props.state == "0") {
       this.setState({state: "Pending"})
     }
     else if(this.props.state == "1") {
       this.setState({state: "Approved"})
     }
     else if(this.props.state == "2") {
      this.setState({state: "Guy Assigned"})
    }
    else if(this.props.state == "3") {
      this.setState({state: "Guy reached location"})
    }
    else if(this.props.state == "4") {
      this.setState({state: "food is prepared"})
    }
    else if(this.props.state == "5") {
      this.setState({state: "Near You"})
    }
    else if(this.props.state == "6") {
      this.setState({state: "Delivered"})
    }
     
 }




  render() {
    
    return (

      <View style={{marginHorizontal: 10, marginBottom:10}}>
        
          <Card>
            <CardItem header>
              <Text style={{fontWeight: 'bold',fontSize: 16}}>Order #{this.state.orderid}</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text>
                 Transaction info:
                </Text>
                <Text>
                 {this.state.txnid}
                </Text>
                <Text>
                 Date: {this.state.date}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
             <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View style={{marginLeft: '10%'}}>
                <Text>Total:</Text>
                <Text style={{fontSize: 16,fontWeight: 'bold'}}>{this.state.total}</Text>
              </View>
              <View style={{marginLeft: '20%'}}>
                <Text>Status:</Text> 
                <Text style={{fontSize: 15,fontWeight: 'bold'}}>{this.state.state}</Text>
              </View>
              </View>
            </CardItem>
         </Card>
      </View>
    )
  }
}

export default withNavigation(OrderList);