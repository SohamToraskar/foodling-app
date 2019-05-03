import React, { Component } from 'react'
import { View, Text, ScrollView ,Image,Dimensions,TouchableNativeFeedback, StyleSheet,TouchableOpacity,Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import StarRating from 'react-native-star-rating';
import {ToastAndroid} from 'react-native';
import Modal from "react-native-modal";
import ReviewList from '../components/ReviewList'


export default class Dish extends Component {

  constructor(props) {
    super(props)
  
    this.state = ({
      isModalVisible: false,

      customer: '',
      ratings: 1,
      review: '',
      reviewList: [],

      
      
      selected: 1,
           
      name: '',
      price: '',
      pic:'',
      about:'',
      id: '',
      fcat: ''
    })
  };


 async reviewData(){
  setTimeout(() => {

    firebase.database().ref().child("reviews").child(global.rest_id).child(this.state.name)
    .on("child_added", snapshot => {
      var customer = snapshot.child("customer").val()
      var ratings = snapshot.child("ratings").val() 
      var review = snapshot.child("review").val()

      setTimeout(() => {

      this.setState({
        customer: customer,
        ratings: ratings,
        review: review
      })

      this.setState(prevState => ({
        reviewList: [...prevState.reviewList, (<ReviewList 
            customer={this.state.customer}
            ratings={this.state.ratings}
            review={this.state.review}
            key={Math.random()}
        />)]
      }))
    
    }, 400)

    })  
   }, 300)
  

}

  

 async getData(){
  setTimeout(() => {

    const { navigation } = this.props;
    const name = navigation.getParam('name')
    const price = navigation.getParam('price')
    const pic = navigation.getParam('pic')
    const about = navigation.getParam('about')
    const id = navigation.getParam('id')
    const fcat = navigation.getParam('fcat')

    this.setState({
      name: name,
      price: price,
      pic: pic,
      about: about,
      rid: id,
      fcat: fcat
   })


  }, 100)
 }

 async componentDidMount(){
  
  this.getData();

  this.reviewData()

  
}

 addToCart(name, price, pic, fcat){
  var child = firebase.database().ref('/cart').child(global.cust_name).push().getKey();
  firebase.database().ref('/cart').child(global.cust_name).child(child).set({
    dname: name,
    dprice: price,
    dpic: pic,
    id: child,
    fcat: fcat,
    rid: global.rest_id
  })

  ToastAndroid.show('Dish Added', ToastAndroid.SHORT);

 }

 _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


  sendReview(){
    

    this._toggleModal()

    firebase.database().ref("reviews").child(global.rest_id).child(this.state.name).child(global.cust_name)
        .set({
            
            customer: global.cust_name,
            ratings: this.state.selected,
            review: this.state.review
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
      
    return (
        <View style={{flex: 1}}>

                <TouchableOpacity onPress={this._toggleModal} style={styles.fab}>
                    <Text style={styles.text}>
                    <Icon name="md-create" color="white" size={30} />
                    </Text>
                  </TouchableOpacity>

            <Modal isVisible={this.state.isModalVisible}>
              <View style={{ flex: 1}}>
                 <View style={{backgroundColor: 'white'}}>
                 <Form style={{margin: 20}}>
                    <Item stackedLabel>
                    <Label style={{fontSize: 15}}>Write Review: </Label>
                    <Input
                      style={{}}
                      autoCorrect={false}
                     
                      onChangeText={ review => this.setState({review})}
                    />
                    </Item>
                    <Text style={{fontSize: 15, marginTop: 10}}>Ratings:
                      </Text>
                    <Picker
                            note
                            mode="dropdown"
                            style={{ width: 120 }}
                            selectedValue={this.state.selected}
                            maxLength={5}
                            onValueChange={this.onValueChange.bind(this)}
                            
                          > 
                            <Picker.Item label="1" value={1} />
                            <Picker.Item label="2" value={2} />
                            <Picker.Item label="3" value={3} />
                            <Picker.Item label="4" value={4} />
                            <Picker.Item label="5" value={5} />
                          </Picker>
                    </Form>
                  
                    <Button style={styles.button}
                        full
                        bordered
                        success
                        onPress={() => this.sendReview()}
                        >  
                        <Text style={styles.loginText}>Post</Text>
                    </Button>

                    <Button style={styles.button}
                        full
                        bordered
                        rounded
                        success
                        onPress={() => this._toggleModal()}
                        >  
                        <Text style={styles.loginText}>Close</Text>
                    </Button>
                  
                </View>
              </View>
            </Modal>

                

        <View style={{flex: 1}}>

          <Image style={styles.bgImage} source={{uri: `${this.state.pic}`}}/>
          
          <View>
            <Text style={styles.pts}>Rs. {this.state.price}
            </Text>
          </View>
        </View>
    
        <View style={{flex: 1}}>
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
            <View style={{height: 250, width: 280, marginLeft: 70,borderWidth:0.5,borderRadius: 20, borderColor:'#dddddd', elevation: 1,marginTop: 10, backgroundColor: 'white'}}>
                <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, textAlign: 'center', margin: 5, marginHorizontal: 10}}>
                 {this.state.name}
                 </Text> 
                 </View>                     
                <View style={{ flex: 2.4 }}>
                <Text style={{ fontSize: 15, marginHorizontal: 20}}>
                {this.state.about}
                </Text>
                 </View> 
            </View>

            <View style={{height: 250, width: 300, marginLeft: 20,marginRight: 50, borderWidth:0.5,borderRadius: 20, borderColor:'#dddddd', elevation: 1,marginTop: 10, backgroundColor: 'white'}}>
                <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, textAlign: 'center', margin: 5, marginHorizontal: 10}}>
                 Reviews
                 </Text> 
                 </View>
                                      
                <View style={{ flex: 6 }}>
                  <ScrollView scrollEventThrottle={16}>
                   
                    
                     {this.state.reviewList}
                   

                  </ScrollView>
                 </View> 
            </View>
            
            </ScrollView>

            <Button style={styles.button}
                full
                rounded
                success
                onPress={() => this.addToCart(this.state.name, this.state.price, this.state.pic, this.state.id, this.state.fcat)}
                >  
                <Text style={styles.loginText}>Add to Cart</Text>
             </Button>
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
    },
    fab:{
      height: 50,
      width: 50,
      borderRadius: 200,
      position: 'absolute',
      bottom: 10,
      right: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#d35400',
    },
    text:{
      fontSize:30,
      color:'white'
    },

    button: {
        margin: 10,
        backgroundColor: '#d35400',
        width: 130,
        marginHorizontal: '34%'
      },
      loginText: {
        color: 'white',
        fontSize: 16,
      },
    
    pts: {
      color: 'white',
      fontSize: 20,
      backgroundColor: '#d35400',
      textAlign: 'center',
      marginHorizontal: '38%',
      paddingVertical: 5,
      borderRadius: 7,
      marginTop: '70%'
    },
    accountInfo: {
      color: 'white',
      fontSize: 20,
      paddingLeft: 18,
  
    },
   
  });