import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';
import { getNotification } from '../../controllers/calendar/actions';

class Review extends Component {
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
        <Text style={styles.overview}>{this.props.notification.overview}</Text>
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: this.props.notification.avatar }} style={{ width: 48, height: 48, borderRadius: 24 }} />
            <Text style={{
              ...styles.label,
              marginLeft: 16,
              color: this.props.customTheme.title
            }}>
              <Text>by </Text>
              <Text style={{ fontWeight: 'bold' }}>{this.props.notification.fullName}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center' }}>
            <Text style={{
              ...styles.label,
              flex: 1,
              marginLeft: 64,
              color: this.props.customTheme.title
            }}>
              <Text>{moment(this.props.notification.createdAt).format('MMM d')} at </Text>
              <Text style={{ fontWeight: 'bold' }}>{moment(this.props.notification.createdAt).format('h:mm A')}</Text>
            </Text>
            <ThemeButton
              icon={{
                name: 'paper-plane',
                type: 'font-awesome',
                size: 22
              }}
              containerStyle={{ marginLeft: 4 }}
              buttonStyle={{ width: 48, height: 48, borderRadius: 12 }}
            />
          </View>
        </View>
        <View style={{ ...styles.separator, backgroundColor: this.props.customTheme.palette.grey3 }} />
        <Text style={{ ...styles.title, color: this.props.customTheme.title }}>Leave your review</Text>
        <View style={{ width: '100%', marginHorizontal: 16 }}>
          <StarRating
            maxStars={5}
            rating={this.state.rating}
            selectedStar={(rating) => this.setState({ rating })}
            containerStyle={{ width: 192 }}
            starSize={32}
            fullStarColor={this.props.customTheme.fullStar}
            emptyStar="star"
            emptyStarColor={this.props.customTheme.emptyStar}
          />
        </View>
        <View style={{ marginHorizontal: 16, marginVertical: 24 }}>
          <View style={{ width: '100%', backgroundColor: this.props.customTheme.palette.grey3, borderRadius: 12, padding: 16 }}>
            <Text style={{ ...styles.label, color: this.props.customTheme.palette.grey0 }}>
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
              size: 24,
              color: this.props.customTheme.palette.grey0
            }}
            TouchableComponent={TouchableOpacity}
            onPress={() => this.props.navigation.pop()}
          />
          <ThemeButton
            containerStyle={{ flex: 1 }}
            buttonStyle={actionStyles.post}
            title="Post review"
            titleStyle={{
              fontFamily: 'Roboto',
              fontSize: 18,
              fontWeight: 'bold'
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overview: {
    marginTop: 14,
    marginHorizontal: 24,
    fontFamily: 'Roboto',
    fontSize: 18
  },
  title: {
    marginHorizontal: 16,
    marginVertical: 24,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: 'bold'
  },
  symbol: {
    fontFamily: 'Roboto',
    fontSize: Math.floor(24 * 0.6),
    fontWeight: 'bold'
  },
  price: {
    marginLeft: 4,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: 'bold'
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: 18
  },
  separator: {
    marginHorizontal: 16,
    height: 1
  }
});

const actionStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  close: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 8
  },
  post: {
    height: 64,
    borderRadius: 12
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);
