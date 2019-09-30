import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
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
    this.imageWidth = width - 16 * 2;
    this.imageHeight = this.imageWidth * 0.65;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader title="Booking details" />
        <FastImage
          style={{
            width: this.imageWidth,
            height: this.imageHeight,
            borderRadius: 12,
            marginTop: 12,
            marginHorizontal: 16
          }}
          source={{ uri: this.props.booking.image }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginTop: 28 }}>
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
        <ScrollView style={{ marginTop: 16, marginBottom: 24, marginHorizontal: 24 }}>
          <Text style={{
            ...styles.label,
            color: this.props.customTheme.label
          }}>{this.props.booking.overview}</Text>
        </ScrollView>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: this.props.booking.avatar }} style={{ width: 48, height: 48, borderRadius: 24 }} />
            <Text style={{
              ...styles.label,
              marginLeft: 16,
              color: this.props.customTheme.title
            }}>by </Text>
            <Text style={{
              ...styles.label,
              color: this.props.customTheme.title,
              fontWeight: 'bold'
            }}>{this.props.booking.fullName}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center' }}>
            <Text style={{
              ...styles.label,
              marginLeft: 64,
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
                size: 22
              }}
              containerStyle={{ marginLeft: 4 }}
              buttonStyle={{ width: 48, height: 48, borderRadius: 12 }}
            />
          </View>
          <Button
            containerStyle={{ marginVertical: 16 }}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
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
  cancel: {
    height: 64,
    borderRadius: 12
  },
  cancelTitle: {
    fontFamily: 'Roboto',
    fontSize: 18,
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
