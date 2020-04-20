import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../component/SceneHeader';
import { getNotifications } from '../../controller/calendar/actions';

class Notifications extends PureComponent {
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

  renderItem = ({ item, index, separators }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.itemBody}>
        <View style={styles.overviewContainer}>
          <Text numberOfLines={2} style={styles.overview}>
            <Text style={{ fontWeight: 'bold' }}>{item.fullName}</Text>
            <Text>{item.processed ? ' waiting for your review!' : ' changed time of booking, new time is '}</Text>
            {!item.processed && (
              <Text style={{ fontWeight: 'bold' }}>{moment(item.time).format('h:mm A, MMM D')}</Text>
            )}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => this.onPress(item)} style={[styles.card, this.props.appTheme.styles.shadow4]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={styles.symbol}>$</Text>
                <Text style={styles.price}>{item.price.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.time}>{moment(item.time).format('h:mm A')}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={styles.details}>View details</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  render = () => (
    <View style={styles.container}>
      <SceneHeader title="Notifications" />
      <FlatList
        data={this.props.notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$container'
  },
  list: {
    marginTop: '8rem'
  },
  separator: {
    height: '1rem',
    marginHorizontal: '16rem',
    backgroundColor: '$grey3Color'
  },
  listItem: {
    padding: '16rem',
    flexDirection: 'row'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  itemBody: {
    paddingLeft: '8rem',
    flex: 1
  },
  overviewContainer: {
    width: '100%',
    height: '40rem'
  },
  overview: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  cardContainer: {
    paddingVertical: '16rem'
  },
  card: {
    borderRadius: '12rem',
    padding: '24rem',
    backgroundColor: '$container'
  },
  detailsContainer: {
    marginTop: '10rem',
    flexDirection: 'row',
    alignItems: 'center'
  },
  details: {
    marginLeft: '8rem',
    color: '$primaryColor',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  title: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textTransform: 'capitalize'
  },
  symbol: {
    marginRight: '4rem',
    color: '$title',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  price: {
    color: '$title',
    fontFamily: 'Lato',
    fontSize: '24rem',
    fontWeight: 'bold'
  },
  time: {
    paddingHorizontal: '4rem',
    paddingVertical: '2rem',
    borderRadius: '4rem',
    backgroundColor: '$grey2Color',
    color: '$grey1Color',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  }
});

const mapStateToProps = ({
  common: { theme },
  calendar: { notifications }
}) => ({
  appTheme: theme,
  notifications
});

const mapDispatchToProps = (dispacth) => ({
  getNotifications: () => dispacth(getNotifications())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
