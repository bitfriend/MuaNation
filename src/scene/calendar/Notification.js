import React, { PureComponent } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';
import { getNotification } from '../../controller/calendar/actions';

class Notification extends PureComponent {
  state = {
    rating: 0,
    comment: ''
  }

  componentDidMount() {
    this.props.getNotification();
  }

  render = () => (
    <View style={styles.container}>
      <SceneHeader />
      <ScrollView>
        <Text style={styles.overview}>{this.props.notification.overview}</Text>
        <View style={styles.card}>
          <View style={styles.cardFirstLine}>
            <Image source={{ uri: this.props.notification.avatar }} style={styles.avatar} />
            <Text style={{
              ...styles.label,
              marginLeft: EStyleSheet.value('16rem'),
              color: EStyleSheet.value('$title')
            }}>
              <Text>by </Text>
              <Text style={{ fontWeight: 'bold' }}>{this.props.notification.fullName}</Text>
            </Text>
          </View>
          <View style={styles.cardSecondLine}>
            <Text style={{
              ...styles.label,
              flex: 1,
              marginLeft: EStyleSheet.value('64rem'),
              color: EStyleSheet.value('$title')
            }}>
              <Text>{moment(this.props.notification.createdAt).format('MMM d')} at </Text>
              <Text style={{ fontWeight: 'bold' }}>{moment(this.props.notification.createdAt).format('h:mm A')}</Text>
            </Text>
            <ThemeButton
              icon={{
                name: 'paper-plane',
                type: 'font-awesome',
                size: EStyleSheet.value('22rem')
              }}
              containerStyle={styles.chatContainer}
              buttonStyle={styles.chat}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>Leave your review</Text>
        <View style={styles.ratingWrapper}>
          <StarRating
            maxStars={5}
            rating={this.state.rating}
            selectedStar={(rating) => this.setState({ rating })}
            containerStyle={styles.rating}
            starSize={EStyleSheet.value('32rem')}
            fullStarColor={EStyleSheet.value('$fullStar')}
            emptyStar="star"
            emptyStarColor={EStyleSheet.value('$emptyStar')}
          />
        </View>
        <View style={styles.reviewWrapper}>
          <View style={styles.reviewContainer}>
            <Text style={{ ...styles.label, color: EStyleSheet.value('$label') }}>
              <Text>The most professional nail care!</Text>
              <Text>Thank you, Jane!</Text>
            </Text>
          </View>
        </View>
        <View style={actionStyles.container}>
          <Button
            buttonStyle={actionStyles.close}
            icon={{
              name: 'close',
              type: 'material',
              size: EStyleSheet.value('24rem'),
              color: EStyleSheet.value('$grey0Color')
            }}
            TouchableComponent={TouchableOpacity}
            onPress={() => this.props.navigation.pop()}
          />
          <ThemeButton
            containerStyle={{ flex: 1 }}
            buttonStyle={actionStyles.post}
            title="Post review"
            titleStyle={actionStyles.postTitle}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$container'
  },
  overview: {
    marginTop: '14rem',
    marginHorizontal: '24rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '18rem'
  },
  card: {
    paddingHorizontal: '16rem',
    paddingVertical: '24rem'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  cardFirstLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardSecondLine: {
    flexDirection: 'row',
    marginTop: '4rem',
    alignItems: 'center'
  },
  chatContainer: {
    marginLeft: '4rem'
  },
  chat: {
    width: '48rem',
    height: '48rem',
    borderRadius: '12rem'
  },
  ratingWrapper: {
    width: '100%',
    marginHorizontal: '16rem'
  },
  rating: {
    width: '192rem'
  },
  title: {
    marginHorizontal: '16rem',
    marginVertical: '24rem',
    color: '$title',
    fontFamily: 'Lato',
    fontSize: '24rem',
    fontWeight: 'bold'
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: '18rem'
  },
  separator: {
    height: '1rem',
    marginHorizontal: '16rem',
    backgroundColor: '$grey3Color'
  },
  reviewWrapper: {
    marginHorizontal: '16rem',
    marginTop: '24rem'
  },
  reviewContainer: {
    width: '100%',
    borderRadius: '12rem',
    padding: '16rem',
    backgroundColor: '$grey3Color'
  }
});

const actionStyles = EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: '16rem'
  },
  close: {
    width: '64rem',
    height: '64rem',
    borderRadius: '12rem',
    marginRight: '8rem',
    backgroundColor: '$grey0Color'
  },
  post: {
    height: '64rem',
    borderRadius: '12rem'
  },
  postTitle: {
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  calendar: { notification }
}) => ({
  notification
});

const mapDispatchToProps = (dispacth) => ({
  getNotification: () => dispacth(getNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
