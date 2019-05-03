import React, { Component } from 'react';
import { View, Text, ScrollView,Image,TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase'

class TwoDish extends Component {

  constructor(props) {
    super(props)
  
    this.state = ({
      restid: '',

    })
  };

  test(){
    this.setState({
      restid: this.props.rid
    })
    rest_id = this.props.rid
    rest_name = this.props.name
    
    this.props.navigation.replace('Home', {name: this.props.name,rid: this.props.rid})
  }

  componentDidMount(){

    // const { navigation } = this.props;
    // const rid = navigation.getParam('rid')

    // this.setState({
    //   restid: rid
    // })
  }

  render() {
    
    return (
      
    
      <TouchableNativeFeedback onPress={() => this.test()}>
            <View style={{width: '100%', height: 220, borderWidth: 0.2, marginBottom: 20, borderRadius: 4, borderColor: '#FF6600', borderWidth: 2, elevation: 5, borderRadius: 10}}>              
                   
                   
                    <View style={{flex: 2}}>
                                
                        <Image style={{ flex:1, width:null,height:null, resizeMode: 'cover',borderRadius: 6}}
                        source={{uri: `${this.props.pic}`}} />
                    
                    </View>
                    
            <View style={{flex: 1, backgroundColor: '#e8e5e5', borderColor: '#FF6600', borderWidth: 1,borderRadius: 6}}>

                <View style={{flex: 1}}>
                  <Text numberOfLines={2} style={{fontSize:20, fontWeight: '300', paddingHorizontal: 7, paddingTop: 3, color: 'black', elevation: 5,textAlign: 'center'}}>
                      {this.props.name}
                  </Text>
                </View>                               
                    <View style={{flex: 2}}>
                     <Text numberOfLines={2} style={{fontSize:13, fontWeight: '300', paddingHorizontal: 7, paddingTop: 3, color: 'black', elevation: 5,textAlign: 'center'}}>
                      Location : {this.props.add}
                  </Text>
                    </View>
                </View>                
        </View>
        </TouchableNativeFeedback>
        
    );
  }
}


export default withNavigation(TwoDish);