import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Badge, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';

import SceneHeader from '../../components/SceneHeader';
import { getBookings } from '../../controllers/calendar/actions';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today'
};
LocaleConfig.defaultLocale = 'en';

class Bookings extends Component {
  componentDidMount() {
    this.props.getBookings();
  }

  renderArrow = (direction) => {
    switch (direction) {
      case 'left':
        return (
          <Icon type="material" name="arrow-back" size={20} color={this.props.customTheme.title} />
        );
      case 'right':
        return (
          <Icon type="material" name="arrow-forward" size={20} color={this.props.customTheme.title} />
        );
    }
  }

  renderDay = ({ date, state }) => {
    let backgroundColor = 'transparent';
    let color = this.props.customTheme.palette.grey0;
    switch (state) {
      case 'disabled':
        color = this.props.customTheme.palette.grey1;
        break;
      case 'selected':
        backgroundColor = this.props.customTheme.palette.secondary;
        color = this.props.customTheme.palette.white;
        break;
      case 'today':
        backgroundColor = this.props.customTheme.palette.primary;
        color = this.props.customTheme.palette.white;
        break;
    }
    return (
      <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor, justifyContent: 'center' }}>
        <Text style={{ color, fontFamily: 'Roboto', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{date.day}</Text>
      </View>
    );
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={{ paddingHorizontal: 16, marginVertical: 8 }}>
        <View style={{
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
            }}>{moment(item.datetime).format('h:mm A')}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Icon type="font-awesome" name="compass" size={16} color={this.props.customTheme.palette.primary} />
              <Text style={{ marginLeft: 8, color: this.props.customTheme.palette.primary }}>Get directions</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader leftIcon={false} title="My bookings" rightIcon={(
          <View>
            <Icon type="font-awesome" name="bell" size={20} color={this.props.customTheme.title} />
            <Badge
              badgeStyle={{ backgroundColor: this.props.customTheme.palette.primary, width: 8, height: 8, borderRadius: 4 }}
              containerStyle={{ position: 'absolute', top: -3, right: -3 }}
            />
          </View>
        )} />
        <Calendar
          monthFormat="MMMM"
          theme={{
            textMonthFontSize: 18,
            textMonthFontFamily: 'Roboto',
            textMonthFontWeight: 'bold',
            monthTextColor: this.props.customTheme.title,
            textDayHeaderFontSize: 18,
            textDayHeaderFontFamily: 'Roboto',
            textDayHeaderFontWeight: 'bold',
            textSectionTitleColor: this.props.customTheme.palette.grey1
          }}
          dayComponent={this.renderDay}
          renderArrow={this.renderArrow}
        />
        <Text style={{
          paddingTop: 24,
          paddingBottom: 8,
          paddingHorizontal: 16,
          color: this.props.customTheme.label,
          fontFamily: 'Roboto',
          fontWeight: 'bold'
        }}>TODAY</Text>
        <FlatList
          data={this.props.bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
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
  calendar: { bookings }
}) => ({
  customTheme: theme,
  bookings
});

const mapDispatchToProps = (dispacth) => ({
  getBookings: () => dispacth(getBookings())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
