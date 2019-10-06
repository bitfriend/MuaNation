import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
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
      this.props.navigation.navigate('Notification');
    } else {
      this.props.navigation.navigate('Booking');
    }
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={styles.listItem}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.itemBody}>
          <View style={styles.overviewContainer}>
            <Text numberOfLines={2} style={{
              ...styles.overview,
              color: this.props.customTheme.title
            }}>
              <Text style={{ fontWeight: 'bold' }}>{item.fullName}</Text>
              <Text>{item.processed ? ' waiting for your review!' : ' changed time of booking, new time is '}</Text>
              {!item.processed && (
                <Text style={{ fontWeight: 'bold' }}>{moment(item.time).format('h:mm A, MMM D')}</Text>
              )}
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => this.onPress(item)} style={{
              ...styles.card,
              backgroundColor: this.props.customTheme.container,
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
              <View style={styles.detailsContainer}>
                <Text style={{
                  ...styles.time,
                  color: this.props.customTheme.palette.grey1,
                  backgroundColor: this.props.customTheme.palette.grey2
                }}>{moment(item.time).format('h:mm A')}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={{ ...styles.details, color: this.props.customTheme.palette.primary }}>View details</Text>
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
          style={styles.list}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  list: {
    marginTop: '8@vs'
  },
  separator: {
    height: verticalScale(StyleSheet.hairlineWidth),
    marginHorizontal: '16@vs'
  },
  listItem: {
    padding: '16@vs',
    flexDirection: 'row'
  },
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  itemBody: {
    paddingLeft: '8@vs',
    flex: 1
  },
  overviewContainer: {
    width: '100%',
    height: '40@vs'
  },
  overview: {
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  },
  cardContainer: {
    paddingVertical: '16@vs'
  },
  card: {
    borderRadius: '12@vs',
    padding: '24@vs'
  },
  detailsContainer: {
    marginTop: '10@vs',
    flexDirection: 'row',
    alignItems: 'center'
  },
  details: {
    marginLeft: '8@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textTransform: 'capitalize'
  },
  symbol: {
    marginRight: '4@vs',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  price: {
    fontFamily: 'Lato',
    fontSize: '24@vs',
    fontWeight: 'bold'
  },
  time: {
    paddingHorizontal: '4@vs',
    paddingVertical: '2@vs',
    borderRadius: '4@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs'
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
