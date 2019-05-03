import React, { Component } from 'react'
import { Text, View } from 'react-native'
import StarRating from 'react-native-star-rating';

class ReviewList extends Component {
  render() {
    return (
      <View>
                <View style={{flex: 1, marginHorizontal: 20, paddingVertical: 5}}>
                    <Text style={{ fontSize: 15}}>
                     {this.props.customer}
                     </Text>
                     <View style={{width: 100}}>
                     <StarRating 
                        disabled={true}
                        maxStars={5}
                        rating={this.props.ratings}
                        starSize={13}
                        fullStarColor={'#ff9d00'} 
                    />
                    </View>
                </View>
                <View>
                    <Text style={{marginHorizontal: 20, fontSize: 13}}>{this.props.review}
                    </Text>
                 </View>
      </View>
    )
  }
}

export default ReviewList
