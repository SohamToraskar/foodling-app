import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image, TouchableNativeFeedback, ScrollView } from 'react-native'
import { Container, Title, Card, CardItem, Left, Right, Content, Thumbnail, Button, Subtitle, Icon, Input, Item } from 'native-base'
import * as firebase from 'firebase'
import { withNavigation } from 'react-navigation'




class CartList extends Component {
    constructor(props) {
        super(props)
      
        this.state = ({
               
          name: '',
          price: '',
          pic: '',
          id: '',
         
        })
      };

   async componentDidMount(){

     

     this.setState({
        name: this.props.name,
        price: this.props.price,
        pic: this.props.pic,
        id: this.props.id
     })

     if (this.props.pic = null) {
         this.setState({
             pic: 'https://www.delicio.in/assets/menu/defaul.png'
         })
    }
    
 }

 deleteData = (id) => {
    
    firebase.database().ref().child("cart").child(global.cust_name).child(id).remove();
    this.render();

    this.props.navigation.replace('CartTab')
  }



  render() {
    return (
        <View style={{marginBottom: 10}}>
            <Card noShadow>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: `${this.state.pic}`}} style={{ width: 60, height: 50, borderRadius: 2, marginLeft: -8}}/>
                        <View style={{ alignItems: 'flex-start', paddingLeft: 10}}>
                            <Title style={{color: 'black', marginBottom: 2, fontSize: 14}}>{this.state.name}</Title>
                            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                
                                <Item regular >
                                <Text style={{paddingHorizontal: 8, paddingVertical: 3}}>Qty. 1
                                </Text>
                                </Item> 
                                
                            </View>
                        </View>
                    </Left>
                
                    <Right>
                        <View style={{ alignItems: 'flex-end'}}>
                            <TouchableNativeFeedback onPress={() => this.deleteData(this.state.id)}> 
                                <Image  source={require('../assets/ic_delete.png')} style={{top: -8}}/>
                            </TouchableNativeFeedback>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../assets/rupee.png')} />
                            <Text style={{fontSize: 20}}> {this.state.price}
                            </Text>
                            </View>
                        </View>
                    </Right>
                </CardItem>
            </Card>
      </View>
    )
  }
}

export default withNavigation(CartList);