import React, { PureComponent } from 'react';
import { View, Text, ScrollView,Image,Dimensions,TouchableNativeFeedback,Alert,BackHandler, StyleSheet } from 'react-native';
import VerticalDish from '../components/VerticalDish'
import TwoDish from '../components/TwoDish'
import { Row } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from 'firebase'
import Firebase from '../components/Firebase'
import AnimatedLoader from 'react-native-animated-loader';


const { height, width } = Dimensions.get('window')

class HomeTab extends PureComponent {

  constructor(props) {
    super(props)
  
    this.state = ({
      visible: true,
           
      verticalDish: [],

      verticalDishTitles: '',

      dishList1: [],
      dishList2: [],
      dishList3: [],
      dishList4: [],
      
      restId: '',

      dishTitles: '',
      dishPrice: '',
      dishPic: '',
      dishAbt: '',
      dishid: '',

      dishFcat: '',
      
      type: [1,1,2,2,3,3,4,4,5,5],
      dishRating: 4.2
      
    })
  };


  async getData(){
    setTimeout(() => {
      <Firebase />

  
  
  firebase.database().ref().child("dish")
  .on("child_added", snapshot => {
    var dname = snapshot.child("fname").val()
    var dprice = snapshot.child("fprice").val() 
    var fcat = snapshot.child("fcat").val()
    var dpic = snapshot.child("fdp").val()
    var rid = snapshot.child("rid").val()
    var abt = snapshot.child("fabout").val()
    var dstate = snapshot.child("state").val()
    var test = `${ dpic }`
   
      
    
   
    if (fcat == "1" && rid == global.rest_id && dstate == 1) {
      
    this.setState({
      dishTitles: dname,
      dishPrice: dprice,
      dishPic: test,
      dishAbt: abt,
      dishid: rid,
      dishFcat: "1"

    })

    this.setState(prevState => ({
      dishList1: [...prevState.dishList1, <TwoDish width={width}
        dishName={this.state.dishTitles}
        rating={this.state.dishRating}
        price={this.state.dishPrice}
        dishUri={this.state.dishPic}
        rid={this.state.dishid} 
        abt={this.state.dishAbt}
        fcat={this.state.dishFcat}
        key={Math.random()}
      />]
    }))
    

  }
   else if (fcat == "2" && rid == global.rest_id && dstate == 1) {
    this.setState({
      dishTitles: dname,
      dishPrice: dprice,
      dishPic: test,
      dishAbt: abt,
      dishid: rid,
      dishFcat: "2"

    })

    this.setState(prevState => ({
      dishList2: [...prevState.dishList2, <TwoDish width={width}
        dishName={this.state.dishTitles}
        rating={this.state.dishRating}
        price={this.state.dishPrice}
        dishUri={this.state.dishPic}
        rid={this.state.dishid} 
        abt={this.state.dishAbt}
        fcat={this.state.dishFcat}
        key={Math.random()}
      />]
    }))
   }
   else if (fcat == "3" && rid == global.rest_id && dstate == 1) {
    this.setState({
      dishTitles: dname,
      dishPrice: dprice,
      dishPic: test,
      dishAbt: abt,
      dishid: rid,
      dishFcat: "3"

    })

    this.setState(prevState => ({
      dishList3: [...prevState.dishList3, <TwoDish width={width}
        dishName={this.state.dishTitles}
        rating={this.state.dishRating}
        price={this.state.dishPrice}
        dishUri={this.state.dishPic}
        rid={this.state.dishid} 
        abt={this.state.dishAbt}
        fcat={this.state.dishFcat}
        key={Math.random()}
      />]
    }))
   }
   else if (fcat == "4" && rid == global.rest_id && dstate == 1) {
    this.setState({
      dishTitles: dname,
      dishPrice: dprice,
      dishPic: test,
      dishAbt: abt,
      dishFcat: "4",
      dishid: rid,
      

    })

    
    this.setState(prevState => ({
      dishList4: [...prevState.dishList4, <TwoDish width={width}
        dishName={this.state.dishTitles}
        rating={this.state.dishRating}
        price={this.state.dishPrice}
        dishUri={this.state.dishPic}
        rid={this.state.dishid} 
        abt={this.state.dishAbt}
        fcat={this.state.dishFcat}
        key={Math.random()}
      />]
    }))
   }

   if (rid == global.rest_id) {

    this.setState(prevState => ({
      verticalDish: [...prevState.verticalDish, (<VerticalDish 
          dishName={this.state.dishTitles}
          price={this.state.dishPrice}
          dishUri={this.state.dishPic}
          abt={this.state.dishAbt}
          fcat={this.state.dishFcat}
          key={Math.random()}
      />)]
    }))
     
   }
   

    
})  

setTimeout(() => {
    this.setState({ 
            visible: false,
          });
        },1000)
  
    }, 100)
  }

   

   async componentDidMount() {

    

    const { navigation } = this.props;
    const name = navigation.getParam('rid')
    
   
     this.getData();

     
  
  }


  
  render() {

    const { visible } = this.state;
    
    return (

       
      

      <View style={ {flex : 1}}>
      <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
          source={require("../assets/loader.json")}
        />
      
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>  
            <Text style={{fontSize: 30,paddingLeft: 20, textAlignVertical: 'center', color: '#FF6600', fontFamily: 'Helvetica-Light'}}>Foodling
            </Text>  
          <TouchableNativeFeedback onPress={()=> this.props.navigation.push('CartTab')}>
          <View style={{padding: 10}}> 
            <Icon name="md-cart" color="#FF6600" size={36}/>   
          </View>  
          </TouchableNativeFeedback>
        </View>

        <ScrollView scrollEventThrottle={16}>
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: 10}}>

        <View style={{}}>
              <Text style={{fontSize: 30, fontWeight: '700', paddingHorizontal: 20, color: '#FF6600'}}>
                {global.rest_name}
              </Text>
              </View>

            <TouchableNativeFeedback onPress={()=> this.props.navigation.replace('Restaurants')}>
             <View style={{}}>
              <Text style={{fontSize: 20, paddingHorizontal: 20, color: '#FF6600'}}>
                Change Restaurant
              </Text>
              </View>
            </TouchableNativeFeedback>

            

              <View style={ {height: 130, marginTop: 20}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                    {this.state.verticalDish}
            
                </ScrollView>
              </View>
            </View>
            <View style={{ marginTop: 40, elevation: 1}}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize:24, fontWeight: '700', paddingLeft: 20, flexDirection: 'row'}}>
                    Starters
                  </Text>

                  <TouchableNativeFeedback onPress={() => this.props.navigation.push('Dinner', {category: "1"})} style={{ paddingTop: 8, flexDirection: 'row', paddingRight: 20}}>
                    <Text style={{fontSize: 17}}>
                    See all
                    </Text>
                  </TouchableNativeFeedback>
                </View>
                
                  <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                  
                    
                  {this.state.dishList1[0]}
                  {this.state.dishList1[1]}
                  

                    
                  </View>
            </View>
            <View style={{ marginTop: 40, elevation: 1}}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize:24, fontWeight: '700', paddingLeft: 20, flexDirection: 'row'}}>
                    Main course
                  </Text>

                  <TouchableNativeFeedback onPress={() => this.props.navigation.push('Dinner', {category: "2"})} style={{ paddingTop: 8, flexDirection: 'row', paddingRight: 20}}>
                    <Text style={{fontSize: 17}}>
                    See all
                    </Text>
                  </TouchableNativeFeedback>
                </View>
                  
                  <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    
                  {this.state.dishList2[0]}
                  {this.state.dishList2[1]}
                    
                  </View>
            </View>
            <View style={{ marginTop: 40, elevation: 1}}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize:24, fontWeight: '700', paddingLeft: 20, flexDirection: 'row'}}>
                    Desserts
                  </Text>

                  <TouchableNativeFeedback onPress={() => this.props.navigation.push('Dinner', {category: "3"})}  style={{ paddingTop: 8, flexDirection: 'row', paddingRight: 20}}>
                    <Text style={{fontSize: 17}}>
                    See all
                    </Text>
                  </TouchableNativeFeedback>
                </View>

                  <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    
                  {this.state.dishList3[0]}
                  {this.state.dishList3[1]}
                    
                  </View>
            </View>
            <View style={{ marginTop: 40, elevation: 1}}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize:24, fontWeight: '700', paddingLeft: 20, flexDirection: 'row'}}>
                    Drinks
                  </Text>

                  <TouchableNativeFeedback onPress={() => this.props.navigation.push('Dinner', {category: "4"})}  style={{ paddingTop: 8, flexDirection: 'row', paddingRight: 20}}>
                    <Text style={{fontSize: 17}}>
                    See all
                    </Text>
                  </TouchableNativeFeedback>
                </View>

                  <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    

                  {this.state.dishList4[0]}
                  {this.state.dishList4[1]}
                    
                  </View>
            </View>
          </ScrollView>

      </View>
    );
  }
}

export default HomeTab;


const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});