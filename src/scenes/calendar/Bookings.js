import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Badge, Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
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

  onPress(item) {
    this.props.navigation.navigate('Booking');
  }

  renderArrow = (direction) => {
    switch (direction) {
      case 'left':
        return (
          <Icon type="material" name="arrow-back" size={verticalScale(20)} color={this.props.customTheme.title} />
        );
      case 'right':
        return (
          <Icon type="material" name="arrow-forward" size={verticalScale(20)} color={this.props.customTheme.title} />
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
      case 'today':
        backgroundColor = this.props.customTheme.palette.primary;
        color = this.props.customTheme.palette.white;
        break;
    }

    const found = this.props.bookings.findIndex(({ createdAt }, index) => moment(createdAt).format('YYYY-MM-DD') === date.dateString);
    if (found !== -1) {
      backgroundColor = this.props.customTheme.palette.secondary;
      color = this.props.customTheme.palette.white;
    }

    return (
      <TouchableOpacity style={{ ...styles.dayBackground, backgroundColor }}>
        <Text style={{ ...styles.dayForeground, color }}>{date.day}</Text>
      </TouchableOpacity>
    );
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity onPress={() => this.onPress(item)} style={{
          ...styles.listItem,
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
          <View style={{ marginTop: verticalScale(10), flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              ...styles.time,
              color: this.props.customTheme.palette.grey1,
              backgroundColor: this.props.customTheme.palette.grey2
            }}>{moment(item.createdAt).format('h:mm A')}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Icon type="font-awesome" name="compass" size={verticalScale(16)} color={this.props.customTheme.palette.primary} />
              <Text style={{ ...styles.direction, color: this.props.customTheme.palette.primary }}>Get directions</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let dates = {};

    this.props.bookings.map((booking, index) => {
      const date = moment(booking.createdAt).format('YYYY-MM-DD');
      dates[date] = {
        customStyles: {
          container: { ...styles.specialDayContainer, backgroundColor: this.props.customTheme.palette.secondary },
          text: { color: this.props.customTheme.title }
        }
      };
    });

    const today = moment().format('YYYY-MM-DD');
    dates[today] = {
      customStyles: {
        container: { ...styles.specialDayContainer, backgroundColor: this.props.customTheme.palette.primary },
        text: { color: this.props.customTheme.title }
      }
    };

    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader leftIcon={false} title="My bookings" rightIcon={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifications')}>
            <Icon type="font-awesome" name="bell" size={verticalScale(20)} color={this.props.customTheme.title} />
            <Badge
              containerStyle={styles.badgeContainer}
              badgeStyle={{ ...styles.badge, backgroundColor: this.props.customTheme.palette.primary }}
            />
          </TouchableOpacity>
        )} />
        <Calendar
          monthFormat="MMMM"
          theme={{
            backgroundColor: this.props.customTheme.container,
            calendarBackground: this.props.customTheme.container,
            textSectionTitleColor: this.props.customTheme.palette.grey1,
            selectedDayBackgroundColor: this.props.customTheme.palette.secondary,
            selectedDayTextColor: this.props.customTheme.palette.grey0,
            textDisabledColor: this.props.customTheme.palette.grey1,
            textMonthFontSize: verticalScale(18),
            textMonthFontFamily: 'Roboto',
            textMonthFontWeight: 'bold',
            monthTextColor: this.props.customTheme.title,
            textDayHeaderFontSize: verticalScale(18),
            textDayHeaderFontFamily: 'Roboto',
            textDayHeaderFontWeight: 'bold',
            dayTextColor: this.props.customTheme.palette.grey0,
            todayBackgroundColor: this.props.customTheme.palette.primary,
            todayTextColor: this.props.customTheme.title
          }}
          renderArrow={this.renderArrow}
          markingType="custom"
          dayComponent={this.renderDay}
          markedDates={dates}
        />
        <Text style={{ ...styles.today, color: this.props.customTheme.label }}>TODAY</Text>
        <FlatList
          data={this.props.bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: '-3@vs',
    right: '-3@vs'
  },
  badge: {
    width: '8@vs',
    height: '8@vs',
    borderRadius: '4@vs'
  },
  dayBackground: {
    width: '40@vs',
    height: '40@vs',
    borderRadius: '12@vs',
    justifyContent: 'center'
  },
  dayForeground: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  specialDayContainer: {
    width: '40@vs',
    height: '40@vs',
    borderRadius: '12@vs'
  },
  itemWrapper: {
    paddingHorizontal: '16@vs',
    marginVertical: '8@vs'
  },
  listItem: {
    borderRadius: '12@vs',
    padding: '24@vs'
  },
  today: {
    paddingTop: '24@vs',
    paddingBottom: '8@vs',
    paddingHorizontal: '16@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
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
    fontSize: '14@vs',
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
  },
  direction: {
    marginLeft: '8@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs'
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
