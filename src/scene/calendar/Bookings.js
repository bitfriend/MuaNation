import React, { PureComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Badge, Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import moment from 'moment';

import SceneHeader from '../../component/SceneHeader';
import { getBookings } from '../../controller/calendar/actions';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today'
};
LocaleConfig.defaultLocale = 'en';

class Bookings extends PureComponent {
  componentDidMount() {
    this.props.getBookings();
  }

  onPress(item) {
    this.props.navigation.navigate('Booking');
  }

  renderArrow = (direction) => {
    if (direction === 'left') {
      return <Icon type="material" name="arrow-back" size={EStyleSheet.value('20rem')} color={EStyleSheet.value('$title')} />
    } else if (direction === 'right') {
      return <Icon type="material" name="arrow-forward" size={EStyleSheet.value('20rem')} color={EStyleSheet.value('$title')} />
    }
  }

  renderDay = ({ date, state }) => {
    let backgroundColor = 'transparent';
    let color = EStyleSheet.value('$grey0Color');

    switch (state) {
      case 'disabled':
        color = EStyleSheet.value('$grey1Color');
        break;
      case 'today':
        backgroundColor = EStyleSheet.value('$primaryColor');
        color = EStyleSheet.value('$whiteColor');
        break;
    }

    const found = this.props.bookings.findIndex(({ createdAt }, index) => moment(createdAt).format('YYYY-MM-DD') === date.dateString);
    if (found !== -1) {
      backgroundColor = EStyleSheet.value('$secondaryColor');
      color = EStyleSheet.value('$whiteColor');
    }

    return (
      <TouchableOpacity style={{ ...styles.dayBackground, backgroundColor }}>
        <Text style={{ ...styles.dayForeground, color }}>{date.day}</Text>
      </TouchableOpacity>
    );
  }

  renderItem = ({ item, index, separators }) => (
    <View style={listStyles.wrapper}>
      <TouchableOpacity onPress={() => this.onPress(item)} style={[listStyles.container, this.props.appTheme.styles.shadow4]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={listStyles.title}>{item.title}</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={listStyles.symbol}>$</Text>
            <Text style={listStyles.price}>{item.price.toFixed(2)}</Text>
          </View>
        </View>
        <View style={listStyles.body}>
          <Text style={listStyles.time}>{moment(item.createdAt).format('h:mm A')}</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Icon type="font-awesome" name="compass" size={EStyleSheet.value('16rem')} color={EStyleSheet.value('$primaryColor')} />
            <Text style={listStyles.direction}>Get directions</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )

  render() {
    let dates = {};

    this.props.bookings.map((booking, index) => {
      const date = moment(booking.createdAt).format('YYYY-MM-DD');
      dates[date] = {
        customStyles: {
          container: { ...styles.specialDayContainer, backgroundColor: EStyleSheet.value('$secondaryColor') },
          text: styles.dayText
        }
      };
    });

    const today = moment().format('YYYY-MM-DD');
    dates[today] = {
      customStyles: {
        container: { ...styles.specialDayContainer, backgroundColor: EStyleSheet.value('$primaryColor') },
        text: styles.dayText
      }
    };

    return (
      <View style={styles.container}>
        <SceneHeader leftIcon={false} title="My bookings" rightIcon={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifications')}>
            <Icon type="font-awesome" name="bell" size={EStyleSheet.value('20rem')} color={EStyleSheet.value('$title')} />
            <Badge
              containerStyle={styles.badgeContainer}
              badgeStyle={styles.badge}
            />
          </TouchableOpacity>
        )} />
        <Calendar
          monthFormat="MMMM"
          theme={{
            backgroundColor: EStyleSheet.value('$container'),
            calendarBackground: EStyleSheet.value('$container'),
            textSectionTitleColor: EStyleSheet.value('$grey1Color'),
            selectedDayBackgroundColor: EStyleSheet.value('$secondaryColor'),
            selectedDayTextColor: EStyleSheet.value('$grey0Color'),
            textDisabledColor: EStyleSheet.value('$grey1Color'),
            textMonthFontSize: EStyleSheet.value('18rem'),
            textMonthFontFamily: 'Roboto',
            textMonthFontWeight: 'bold',
            monthTextColor: EStyleSheet.value('$title'),
            textDayHeaderFontSize: EStyleSheet.value('18rem'),
            textDayHeaderFontFamily: 'Roboto',
            textDayHeaderFontWeight: 'bold',
            dayTextColor: EStyleSheet.value('$grey0Color'),
            todayBackgroundColor: EStyleSheet.value('$primaryColor'),
            todayTextColor: EStyleSheet.value('$title')
          }}
          renderArrow={this.renderArrow}
          markingType="custom"
          dayComponent={this.renderDay}
          markedDates={dates}
        />
        <Text style={{ ...styles.today, color: EStyleSheet.value('$label') }}>TODAY</Text>
        <FlatList
          data={this.props.bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$container'
  },
  badgeContainer: {
    position: 'absolute',
    top: '-3rem',
    right: '-3rem'
  },
  badge: {
    width: '8rem',
    height: '8rem',
    borderRadius: '4rem',
    backgroundColor: '$primaryColor'
  },
  dayBackground: {
    width: '40rem',
    height: '40rem',
    borderRadius: '12rem',
    justifyContent: 'center'
  },
  dayForeground: {
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  specialDayContainer: {
    width: '40rem',
    height: '40rem',
    borderRadius: '12rem'
  },
  dayText: {
    color: '$title'
  },
  today: {
    paddingTop: '24rem',
    paddingBottom: '8rem',
    paddingHorizontal: '16rem',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  }
});

const listStyles = EStyleSheet.create({
  wrapper: {
    paddingHorizontal: '16rem',
    marginVertical: '8rem'
  },
  container: {
    borderRadius: '12rem',
    padding: '24rem',
    backgroundColor: '$container'
  },
  body: {
    marginTop: '10rem',
    flexDirection: 'row',
    alignItems: 'center'
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
    fontSize: '14rem',
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
  },
  direction: {
    marginLeft: '8rem',
    color: '$primaryColor',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  }
});

const mapStateToProps = ({
  common: { theme },
  calendar: { bookings }
}) => ({
  appTheme: theme,
  bookings
});

const mapDispatchToProps = (dispacth) => ({
  getBookings: () => dispacth(getBookings())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
