import React, { PureComponent } from 'react'
import { Text, View, TouchableHighlight, Image, TouchableNativeFeedback, ScrollView } from 'react-native'
import { Container, Title, Card, CardItem, Left, Right, Content, Thumbnail, Button, Subtitle, Icon } from 'native-base'
import StarRating from 'react-native-star-rating'
import { withNavigation } from 'react-navigation'
import * as firebase from 'firebase'
import {ToastAndroid} from 'react-native';



class DishList extends PureComponent {
 
    constructor(props) {
        super(props)
      
        this.state = ({
               
          name: '',
    
          rating:  1,
          price: '',
          pic:'',
          about: '',
          fcat: ''
        })
      };


 async componentDidMount(){
     

     this.setState({
        name: this.props.name,
    
        rating: this.props.rating,
        price: this.props.price,
        pic: this.props.pic,
        about: this.props.abt,
        id: this.props.rid,
        fcat: this.props.fcat
     })

 }

 addToCart(){
     
    var child = firebase.database().ref('/cart').child(global.cust_name).push().getKey();
    firebase.database().ref('/cart').child(global.cust_name).child(child).set({
      dname: this.state.name,
      dprice: this.state.price,
      dpic: this.state.pic,
      id: child,
      fcat: this.state.fcat,
      rid: global.rest_id
    })

    ToastAndroid.show('Dish Added', ToastAndroid.SHORT);
  
   }

  render() {
    return (
      <View style={{marginBottom: 10}}>
       <TouchableNativeFeedback onPress={() => this.props.navigation.push('Dish', {name: this.state.name, price: this.state.price, pic: this.state.pic, about: this.state.about,id: this.state.id,fcat: this.state.fcat})}>
        <Card>
            <CardItem>
                <Left>
                    <Image source={{uri: `${this.state.pic}`}} style={{ width: 100, height: 80, borderRadius: 8, marginLeft: -8}}/>
                    
                    <View style={{ alignItems: 'flex-start', paddingLeft: 10}}>
                        <Title style={{color: 'black', marginBottom: 2, fontSize: 18}}>{this.state.name}</Title>
                        <StarRating 
                        disabled={true}
                        maxStars={5}
                        rating={this.state.rating}
                        starSize={14}
                        fullStarColor={'#ff9d00'} 
                        />
                        <Subtitle style={{color: '#7D7D7D',fontWeight: 'bold', paddingLeft: 3, marginTop: 10, fontSize: 17, paddingHorizontal: 5, paddingVertical: 3}}>Rs. {this.state.price}</Subtitle>
                    </View>
                </Left>

                <Right>
                    <View style={{ alignItems: 'flex-end'}}>
                        <TouchableNativeFeedback>
                            <Image source={require('../assets/more_arrow.png')} style={{top: -8}}/>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback onPress={() => this.addToCart()}>
                            <Image source={require('../assets/add_item.png')} style={{marginBottom: -90, height: 60, width: 60}} />
                        </TouchableNativeFeedback>
                    </View>
                </Right>
            </CardItem>
        </Card>
       </TouchableNativeFeedback>
      </View>
    )
  }
}

export default withNavigation(DishList);