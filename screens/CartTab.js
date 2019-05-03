import React, { PureComponent } from 'react';
import {  View, Text, ScrollView, Image, TouchableNativeFeedback,BackHandler } from 'react-native';
import { Container, Title, Card, CardItem, Left, Right, Content, Thumbnail, Button } from 'native-base'
import CartList from '../components/CartList'
import * as firebase from 'firebase'
import AnimatedLoader from 'react-native-animated-loader';


class CartTab extends PureComponent {

  constructor(props) {
    super(props)
  
    this.state = ({
      visible: true,
           
      cartList: [],

      tName: [],
      tPrice: [],

      dishTitles: '',
      dishPrice: '',
      dishPic: '',
      dishID: '',
      rid: '',
      totalPrice: 0,
      fcat: '',
      tFcat: ''
    })
    

  }
  async getData(){
    
    setTimeout(() => {
      // <Firebase /> 
  
  firebase.database().ref().child("cart").child(global.cust_name)
  .on("child_added", snapshot => {
    var dname = snapshot.child("dname").val()
    var dprice = snapshot.child("dprice").val()
    var dpic = snapshot.child("dpic").val()
    var id = snapshot.child("id").val()
    var fcat = snapshot.child("fcat").val()
    var restid = snapshot.child("rid").val()
    var test = `${ dpic }`

    if ( restid == global.rest_id) {
      
    
   
    this.setState({
      dishTitles: dname,
      dishPrice: dprice,
      dishPic: test,
      dishID: id,
      rid: restid,
      fcat: fcat,
      totalPrice: this.state.totalPrice + dprice

    })

    this.setState(prevState => ({
      tName: [...prevState.tName, this.state.dishTitles],
      tPrice: [...prevState.tPrice, this.state.dishPrice],
      tFcat: [...prevState.tPrice, this.state.fcat]
    }))

    this.setState(prevState => ({
      cartList: [...prevState.cartList, <CartList 
        name={this.state.dishTitles}
        price={this.state.dishPrice}
        pic={this.state.dishPic}
        id={this.state.dishID}
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
  
    }, 400)
  }



  async componentDidMount() {

    // BackHandler.addEventListener('hardwareBackPress', function(){
    //   return true;
    // });


    

    this.getData();
    // this.update();
 }

 close(){
  this.props.navigation.navigate('Home')
  // BackHandler.removeEventListener('hardwareBackPress', function(){})
 }

 static navigationOption={
   title: 'cart',
   headerLeft:null
 }
  
  render() {

    const { visible } = this.state;

    return (
      <View style={ {flex : 1}}>

      <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={{width: 100, height: 100}}
                speed={1}
                source={require("../assets/loader.json")}
              />
        <View style={{ height: 50, backgroundColor: 'white', justifyContent: 'flex-end', flexDirection: 'row'}}>      
          <Text style={{flex: 1,color: '#FF6600', fontSize: 30, justifyContent: 'flex-start', margin: 5}}>Cart</Text>
          <TouchableNativeFeedback onPress={() => this.close()}>
          <Image source={require('../assets/ic_close.png')} style={{ margin: 18, height: 23, width: 23}}/>
          </TouchableNativeFeedback>
        </View>
        <View>
          <ScrollView scrollEventThrottle={16} style={{height: '85%'}}>
            
            <View style={{flex: 1}}>
                  {this.state.cartList}
            </View>
          </ScrollView>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
            <View style={{flex: 1, flexDirection: 'row', height: 40, backgroundColor: '#ffa100',justifyContent: 'space-between',paddingHorizontal: 30,width: '65%', paddingVertical: 8}}>
              <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>TOTAL :
              </Text>
              <Text style={{color: 'white', fontSize: 15}}>Rs. {this.state.totalPrice}</Text>
            </View>
           <TouchableNativeFeedback onPress={()=> this.props.navigation.push('Checkout',{total: this.state.totalPrice,nameList: this.state.tName,fcatList:this.state.tFcat, priceList: this.state.tPrice, rid: this.state.rid})}>
            <View style={{height: 40, backgroundColor: '#FF6600', bottom: 0,width: '35%' ,justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>Checkout >
              </Text>
            </View>
           </TouchableNativeFeedback>
          </View>
        
      </View>
    );
  }
}

export default CartTab;
