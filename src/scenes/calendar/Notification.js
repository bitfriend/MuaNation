import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';
import { getNotification } from '../../controllers/calendar/actions';

class Notification extends Component {
  state = {
    rating: 0,
    comment: ''
  }

  componentDidMount() {
    this.props.getNotification();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader />
        <ScrollView>
          <Text style={{ ...styles.overview, color: this.props.customTheme.label }}>{this.props.notification.overview}</Text>
          <View style={styles.card}>
            <View style={styles.cardFirstLine}>
              <Image source={{ uri: this.props.notification.avatar }} style={styles.avatar} />
              <Text style={{
                ...styles.label,
                marginLeft: verticalScale(16),
                color: this.props.customTheme.title
              }}>
                <Text>by </Text>
                <Text style={{ fontWeight: 'bold' }}>{this.props.notification.fullName}</Text>
              </Text>
            </View>
            <View style={styles.cardSecondLine}>
              <Text style={{
                ...styles.label,
                flex: 1,
                marginLeft: verticalScale(64),
                color: this.props.customTheme.title
              }}>
                <Text>{moment(this.props.notification.createdAt).format('MMM d')} at </Text>
                <Text style={{ fontWeight: 'bold' }}>{moment(this.props.notification.createdAt).format('h:mm A')}</Text>
              </Text>
              <ThemeButton
                icon={{
                  name: 'paper-plane',
                  type: 'font-awesome',
                  size: verticalScale(22)
                }}
                containerStyle={styles.chatContainer}
                buttonStyle={styles.chat}
              />
            </View>
          </View>
          <View style={{ ...styles.separator, backgroundColor: this.props.customTheme.palette.grey3 }} />
          <Text style={{ ...styles.title, color: this.props.customTheme.title }}>Leave your review</Text>
          <View style={styles.ratingWrapper}>
            <StarRating
              maxStars={5}
              rating={this.state.rating}
              selectedStar={(rating) => this.setState({ rating })}
              containerStyle={{ width: verticalScale(192) }}
              starSize={verticalScale(32)}
              fullStarColor={this.props.customTheme.fullStar}
              emptyStar="star"
              emptyStarColor={this.props.customTheme.emptyStar}
            />
          </View>
          <View style={styles.reviewWrapper}>
            <View style={{ ...styles.reviewContainer, backgroundColor: this.props.customTheme.palette.grey3 }}>
              <Text style={{ ...styles.label, color: this.props.customTheme.label }}>
                <Text>The most professional nail care!</Text>
                <Text>Thank you, Jane!</Text>
              </Text>
            </View>
          </View>
          <View style={actionStyles.container}>
            <Button
              buttonStyle={{
                ...actionStyles.close,
                backgroundColor: this.props.customTheme.palette.grey3
              }}
              icon={{
                name: 'close',
                type: 'material',
                size: verticalScale(24),
                color: this.props.customTheme.palette.grey0
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
    );
  }
}

const styles = ScaledSheet.create({
  overview: {
    marginTop: '14@vs',
    marginHorizontal: '24@vs',
    fontFamily: 'Roboto',
    fontSize: '18@vs'
  },
  card: {
    paddingHorizontal: '16@vs',
    paddingVertical: '24@vs'
  },
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  cardFirstLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardSecondLine: {
    flexDirection: 'row',
    marginTop: '4@vs',
    alignItems: 'center'
  },
  chatContainer: {
    marginLeft: '4@vs'
  },
  chat: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '12@vs'
  },
  ratingWrapper: {
    width: '100%',
    marginHorizontal: '16@vs'
  },
  title: {
    marginHorizontal: '16@vs',
    marginVertical: '24@vs',
    fontFamily: 'Lato',
    fontSize: '24@vs',
    fontWeight: 'bold'
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: '18@vs'
  },
  separator: {
    marginHorizontal: '16@vs',
    height: '1@vs'
  },
  reviewWrapper: {
    marginHorizontal: '16@vs',
    marginTop: '24@vs'
  },
  reviewContainer: {
    width: '100%',
    borderRadius: '12@vs',
    padding: '16@vs'
  }
});

const actionStyles = ScaledSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: '16@vs'
  },
  close: {
    width: '64@vs',
    height: '64@vs',
    borderRadius: '12@vs',
    marginRight: '8@vs'
  },
  post: {
    height: '64@vs',
    borderRadius: '12@vs'
  },
  postTitle: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  calendar: { notification }
}) => ({
  customTheme: theme,
  notification
});

const mapDispatchToProps = (dispacth) => ({
  getNotification: () => dispacth(getNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
