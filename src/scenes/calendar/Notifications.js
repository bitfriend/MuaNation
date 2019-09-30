import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import { getNotifications } from '../../controllers/calendar/actions';

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotifications();
  }

  onPress(item) {
    if (item.processed) {
      this.props.navigation.navigate('Review');
    } else {
      this.props.navigation.navigate('Booking');
    }
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={{ padding: 16, flexDirection: 'row' }}>
        <Image source={{ uri: item.avatar }} style={{ width: 48, height: 48, borderRadius: 24 }} />
        <View style={{ paddingLeft: 8, flex: 1 }}>
          <View style={{ width: '100%', height: 40 }}>
            <Text numberOfLines={2} style={{
              color: this.props.customTheme.title,
              fontFamily: 'Roboto'
            }}>
              <Text style={{ fontWeight: 'bold' }}>{item.fullName}</Text>
              <Text>{item.processed ? ' waiting for your review!' : ' changed time of booking, new time is '}</Text>
              {!item.processed && (
                <Text style={{ fontWeight: 'bold' }}>{moment(item.time).format('h:mm A, MMM D')}</Text>
              )}
            </Text>
          </View>
          <View style={{ paddingVertical: 16 }}>
            <TouchableOpacity onPress={() => this.onPress(item)} style={{
              borderRadius: 12,
              backgroundColor: this.props.customTheme.container,
              padding: 24,
              ...this.props.customTheme.shadows[3]
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{
                  ...styles.title,
                  color: this.props.customTheme.title
                }}>{item.title}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={{
                    ...styles.symbol,
                    color: this.props.customTheme.title
                  }}>$</Text>
                  <Text style={{
                    ...styles.price,
                    color: this.props.customTheme.title
                  }}>{item.price.toFixed(2)}</Text>
                </View>
              </View>
              <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  ...styles.time,
                  color: this.props.customTheme.palette.grey1,
                  backgroundColor: this.props.customTheme.palette.grey2
                }}>{moment(item.time).format('h:mm A')}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={{ marginLeft: 8, color: this.props.customTheme.palette.primary }}>View details</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader title="Notifications" />
        <FlatList
          data={this.props.notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 1, marginHorizontal: 16, backgroundColor: this.props.customTheme.palette.grey3 }} />}
          style={{ marginTop: 8 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textTransform: 'capitalize'
  },
  symbol: {
    marginRight: 4,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  price: {
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: 'bold'
  },
  time: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'Roboto'
  }
});

const mapStateToProps = ({
  common: { theme },
  calendar: { notifications }
}) => ({
  customTheme: theme,
  notifications
});

const mapDispatchToProps = (dispacth) => ({
  getNotifications: () => dispacth(getNotifications())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
