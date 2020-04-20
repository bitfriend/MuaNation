import React, { PureComponent } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import moment from 'moment';

import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';
import { getBooking } from '../../controller/calendar/actions';

const imageWidth = EStyleSheet.value(`${375 - 16 * 2}rem`);
const imageHeight = imageWidth * 0.65;

class Booking extends PureComponent {
  componentDidMount() {
    this.props.getBooking();
  }

  render = () => (
    <View style={styles.container}>
      <SceneHeader title="Booking details" />
      <ScrollView>
        <FastImage
          style={{
            width: imageWidth,
            height: imageHeight,
            ...styles.banner
          }}
          source={{ uri: this.props.booking.image }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.body}>
          <Text style={styles.title}>{this.props.booking.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.symbol}>$</Text>
            <Text style={styles.price}>{this.props.booking.price && this.props.booking.price.toFixed(2)}</Text>
          </View>
        </View>
        <Text style={{
          ...styles.overview,
          ...styles.label,
          color: EStyleSheet.value('$label')
        }}>{this.props.booking.overview}</Text>
        <View style={styles.footer}>
          <View style={styles.footerFirstLine}>
            <Image source={{ uri: this.props.booking.avatar }} style={styles.avatar} />
            <Text style={{
              ...styles.label,
              marginLeft: EStyleSheet.value('16rem'),
              color: EStyleSheet.value('$title')
            }}>by </Text>
            <Text style={{
              ...styles.label,
              color: EStyleSheet.value('$title'),
              fontWeight: 'bold'
            }}>{this.props.booking.fullName}</Text>
          </View>
          <View style={styles.footerSecondLine}>
            <Text style={{
              ...styles.label,
              marginLeft: EStyleSheet.value('64rem'),
              color: EStyleSheet.value('$title')
            }}>{moment(this.props.booking.createdAt).format('MMM d')} at </Text>
            <Text style={{
              ...styles.label,
              flex: 1,
              color: EStyleSheet.value('$title'),
              fontWeight: 'bold'
            }}>{moment(this.props.booking.createdAt).format('h:mm A')}</Text>
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
          <Button
            containerStyle={styles.cancelContainer}
            buttonStyle={styles.cancel}
            title="Cancel"
            titleStyle={styles.cancelTitle}
            TouchableComponent={TouchableOpacity}
            onPress={() => this.props.navigation.pop()}
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
  banner: {
    borderRadius: '12rem',
    marginTop: '12rem',
    marginHorizontal: '16rem'
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '24rem',
    marginTop: '28rem'
  },
  overview: {
    marginTop: '16rem',
    marginBottom: '24rem',
    marginHorizontal: '24rem'
  },
  footer: {
    paddingHorizontal: '16rem'
  },
  footerFirstLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerSecondLine: {
    flexDirection: 'row',
    marginTop: '4rem',
    alignItems: 'center'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  chatContainer: {
    marginLeft: '4rem'
  },
  chat: {
    width: '48rem',
    height: '48rem',
    borderRadius: '12rem'
  },
  title: {
    flex: 1,
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  symbol: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '24rem * 0.6',
    fontWeight: 'bold'
  },
  price: {
    marginLeft: '4rem',
    color: '$title',
    fontFamily: 'Lato',
    fontSize: '24rem',
    fontWeight: 'bold'
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: '18rem'
  },
  cancelContainer: {
    marginVertical: '16rem'
  },
  cancel: {
    height: '64rem',
    borderRadius: '12rem',
    backgroundColor: '$grey3Color'
  },
  cancelTitle: {
    color: '$grey0Color',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  calendar: { booking }
}) => ({
  booking
});

const mapDispatchToProps = (dispacth) => ({
  getBooking: () => dispacth(getBooking())
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
