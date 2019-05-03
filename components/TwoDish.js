import React, { Component } from 'react';
import { View, Text, ScrollView,Image,TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase'

class TwoDish extends Component {

  

  render() {
    return (
      <TouchableNativeFeedback onPress={() => this.props.navigation.push('Dish', {name: this.props.dishName, price: this.props.price, pic: this.props.dishUri, about: this.props.abt,id: this.props.rid,fcat: this.props.fcat})}>
            <View style={{width: this.props.width/2.2 - 5, height: this.props.width/2 - 5, borderWidth: 0.2, marginBottom: 10, borderRadius: 4}}>              
                   
                   
                    <View style={{flex: 1.4}}>
                                
                        <Image style={{ flex:1, width:null,height:null, resizeMode: 'cover'}}
                        source={{uri: `${this.props.dishUri}`}} />
                    
                    </View>
                    
            <View style={{flex: 1}}>

                <View style={{flex: 1.5}}>
                  <Text numberOfLines={2} style={{fontSize:13, fontWeight: '300', paddingHorizontal: 7, paddingTop: 3}}>
                      {this.props.dishName}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                    
                    <View>

                      <Text style={{backgroundColor: '#FF6600', fontWeight: 'bold', color: 'white',fontSize: 16, padding:3, borderRadius: 2}}>
                        Rs. {this.props.price}
                      </Text>
                    </View>
                    <View style={{alignContent: 'flex-end', flexDirection: 'row', paddingRight: 10}}>
                        <Text style={{fontSize:15, fontWeight: '300', paddingLeft: 5}}>
                        {this.props.rating}
                        </Text>
                        <View>
                          <StarRating 
                              disabled={true}
                              maxStars={1}
                              rating={this.props.rating}
                              starSize={18}
                              fullStarColor={'#ff9d00'} 
                              />
                          </View>
                    </View>
                    
                    
                </View>
            
              </View>
            
        </View>
        </TouchableNativeFeedback>
    );
  }
}


export default withNavigation(TwoDish);