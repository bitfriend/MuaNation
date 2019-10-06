import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import moment from 'moment';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';
import { getBooking } from '../../controllers/calendar/actions';

class Booking extends Component {
  componentDidMount() {
    this.props.getBooking();

    const { width } = Dimensions.get('window');
    this.imageWidth = width - verticalScale(16) * 2;
    this.imageHeight = this.imageWidth * 0.65;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader title="Booking details" />
        <ScrollView>
          <FastImage
            style={{
              ...styles.banner,
              width: this.imageWidth,
              height: this.imageHeight
            }}
            source={{ uri: this.props.booking.image }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.body}>
            <Text style={{
              ...styles.title,
              color: this.props.customTheme.title
            }}>{this.props.booking.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{
                ...styles.symbol,
                color: this.props.customTheme.title
              }}>$</Text>
              <Text style={{
                ...styles.price,
                color: this.props.customTheme.title
              }}>{this.props.booking.price && this.props.booking.price.toFixed(2)}</Text>
            </View>
          </View>
          <Text style={{
            ...styles.overview,
            ...styles.label,
            color: this.props.customTheme.label
          }}>{this.props.booking.overview}</Text>
          <View style={styles.footer}>
            <View style={styles.footerFirstLine}>
              <Image source={{ uri: this.props.booking.avatar }} style={styles.avatar} />
              <Text style={{
                ...styles.label,
                marginLeft: verticalScale(16),
                color: this.props.customTheme.title
              }}>by </Text>
              <Text style={{
                ...styles.label,
                color: this.props.customTheme.title,
                fontWeight: 'bold'
              }}>{this.props.booking.fullName}</Text>
            </View>
            <View style={styles.footerSecondLine}>
              <Text style={{
                ...styles.label,
                marginLeft: verticalScale(64),
                color: this.props.customTheme.title
              }}>{moment(this.props.booking.createdAt).format('MMM d')} at </Text>
              <Text style={{
                ...styles.label,
                flex: 1,
                color: this.props.customTheme.title,
                fontWeight: 'bold'
              }}>{moment(this.props.booking.createdAt).format('h:mm A')}</Text>
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
            <Button
              containerStyle={styles.cancelContainer}
              buttonStyle={{
                ...styles.cancel,
                backgroundColor: this.props.customTheme.palette.grey3
              }}
              title="Cancel"
              titleStyle={{
                ...styles.cancelTitle,
                color: this.props.customTheme.palette.grey0
              }}
              TouchableComponent={TouchableOpacity}
              onPress={() => this.props.navigation.pop()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  banner: {
    borderRadius: '12@vs',
    marginTop: '12@vs',
    marginHorizontal: '16@vs'
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '24@vs',
    marginTop: '28@vs'
  },
  overview: {
    marginTop: '16@vs',
    marginBottom: '24@vs',
    marginHorizontal: '24@vs'
  },
  footer: {
    paddingHorizontal: '16@vs'
  },
  footerFirstLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerSecondLine: {
    flexDirection: 'row',
    marginTop: '4@vs',
    alignItems: 'center'
  },
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  chatContainer: {
    marginLeft: '4@vs'
  },
  chat: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '12@vs'
  },
  title: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  symbol: {
    fontFamily: 'Roboto',
    fontSize: Math.floor(verticalScale(24) * 0.6),
    fontWeight: 'bold'
  },
  price: {
    marginLeft: '4@vs',
    fontFamily: 'Lato',
    fontSize: '24@vs',
    fontWeight: 'bold'
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: '18@vs'
  },
  cancelContainer: {
    marginVertical: '16@vs'
  },
  cancel: {
    height: '64@vs',
    borderRadius: '12@vs'
  },
  cancelTitle: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  calendar: { booking }
}) => ({
  customTheme: theme,
  booking
});

const mapDispatchToProps = (dispacth) => ({
  getBooking: () => dispacth(getBooking())
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
