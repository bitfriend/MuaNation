/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Animated, Easing, Text } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import {
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import { Icon } from 'react-native-elements';

import { combineReducers } from 'redux';

import commonReducer from './src/controllers/common/reducer';
import authReducer from './src/controllers/auth/reducer';
import artistReducer from './src/controllers/artist/reducer';
import productReducer from './src/controllers/product/reducer';
import relationReducer from './src/controllers/relation/reducer';
import reviewReducer from './src/controllers/review/reducer';
import discoverReducer from './src/controllers/discover/reducer';
import calendarReducer from './src/controllers/calendar/reducer';
import chatReducer from './src/controllers/chat/reducer';
import serviceReducer from './src/controllers/service/reducer';

const appReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  artist: artistReducer,
  product: productReducer,
  relation: relationReducer,
  review: reviewReducer,
  discover: discoverReducer,
  calendar: calendarReducer,
  chat: chatReducer,
  service: serviceReducer
});

const store = createStore(appReducer, applyMiddleware(thunk));
store.dispatch(getProducts());
const { common } = store.getState();

import Splash from './src/scenes/Splash';

import SignIn from './src/scenes/auth/SignIn';
import CreateAccount from './src/scenes/auth/CreateAccount';
import ImportMedia from './src/scenes/auth/ImportMedia';
import AccessLocation from './src/scenes/auth/AccessLocation';
import SuggestedArtists from './src/scenes/auth/SuggestedArtists';

import FixedTabBar from './src/components/FixedTabBar';
import Artists from './src/scenes/featured/Artists';
import Products from './src/scenes/featured/Products';

import Artist from './src/scenes/featured/Artist';
import Relations from './src/scenes/featured/Relations';
import Reviews from './src/scenes/featured/Reviews';
import SaleProduct from './src/scenes/featured/SaleProduct';
import PopularProduct from './src/scenes/featured/PopularProduct';
import Discover from './src/scenes/tab/Discover';
import Bookings from './src/scenes/calendar/Bookings';
import Booking from './src/scenes/calendar/Booking';
import Notifications from './src/scenes/calendar/Notifications';
import Notification from './src/scenes/calendar/Notification';
import Account from './src/scenes/profile/Account';
import AddService from './src/scenes/profile/AddService';
import EditInfo from './src/scenes/profile/EditInfo';
import Chats from './src/scenes/profile/Chats';
import Chat from './src/scenes/profile/Chat';
import Settings from './src/scenes/profile/Settings';

import LoadingSpinner from './src/components/LoadingSpinner';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getProducts } from './src/controllers/product/actions';

console.disableYellowBox = true;

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 200,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const translateX = position.interpolate({
        inputRange: [scene.index - 1, scene.index],
        outputRange: [layout.initWidth, 0],
      });
      return {
        transform: [{ translateX }]
      };
    }
  }
};

const AuthStackNav = createStackNavigator({
  SignIn: { screen: SignIn },
  ImportMedia : { screen: ImportMedia },
  AccessLocation: { screen: AccessLocation },
  SuggestedArtists: { screen: SuggestedArtists },
  CreateAccount: { screen: CreateAccount },
}, {
  initialRouteName: 'SignIn',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  }
});

const FeaturedTabNav = createMaterialTopTabNavigator({
  Artists: {
    screen: Artists,
    navigationOptions: { tabBarLabel: 'Artists' }
  },
  Products: {
    screen: Products,
    navigationOptions: { tabBarLabel: 'Products' }
  }
}, {
  tabBarComponent: props => <FixedTabBar {...props} />,
  tabBarOptions: {
    style: { backgroundColor: common.theme.container },
    activeTintColor: common.theme.palette.secondary,
    inactiveTintColor: common.theme.palette.grey0,
    labelStyle: {
      fontFamily: 'Lato',
      fontSize: verticalScale(24),
      fontWeight: 'bold',
      margin: 0,
      paddingBottom: verticalScale(2)
    },
    upperCaseLabel: false,
    indicatorStyle: { backgroundColor: common.theme.palette.secondary }
  }
});

const DiscoverStackNav = createStackNavigator({
  Discover: { screen: Discover }
}, {
  initialRouteName: 'Discover',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  }
});

const CalendarStackNav = createStackNavigator({
  Bookings: { screen: Bookings },
  Booking: { screen: Booking },
  Notifications: { screen: Notifications },
  Notification: { screen: Notification }
}, {
  initialRouteName: 'Bookings',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  }
});

const ProfileStackNav = createStackNavigator({
  Account: { screen: Account },
  AddService: { screen: AddService },
  EditInfo: { screen: EditInfo },
  Chats: { screen: Chats },
  Chat: { screen: Chat },
  Settings: { screen: Settings }
}, {
  initialRouteName: 'Account',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  }
});

const FeaturedStackNav = createStackNavigator({
  FeaturedTabNav: { screen: FeaturedTabNav },
  Artist: { screen: Artist },
  Relations: { screen: Relations },
  Reviews: { screen: Reviews },
  SaleProduct: { screen: SaleProduct },
  PopularProduct: { screen: PopularProduct },
  Booking: { screen: Booking }
}, {
  initialRouteName: 'FeaturedTabNav',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  },
  navigationOptions: ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes) {
      const currentRoute = navigation.state.routes[navigation.state.routes.length - 1].routeName;
      if (currentRoute === 'SaleProduct' || currentRoute === 'PopularProduct')
        tabBarVisible = false;
    }
    return { tabBarVisible };
  }
});

function getTabeBarLabel(focused, tintColor, title) {
  if (focused) {
    return <Text style={{
      textAlign: 'center',
      color: tintColor,
      fontFamily: 'Roboto',
      fontSize: verticalScale(10)
    }}>{title}</Text>;
  } else {
    return null;
  }
}

import { verticalScale } from 'react-native-size-matters';

const AppTabNav = createBottomTabNavigator({
  Featured: {
    screen: FeaturedStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabeBarLabel(focused, tintColor, 'Featured'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="font-awesome" name="star" size={verticalScale(25)} color={tintColor} />
      )
    }
  },
  Discover: {
    screen: DiscoverStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabeBarLabel(focused, tintColor, 'Discover'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-search" size={verticalScale(25)} color={tintColor} />
      )
    }
  },
  Calendar: {
    screen: CalendarStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabeBarLabel(focused, tintColor, 'Calendar'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-calendar" size={verticalScale(25)} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabeBarLabel(focused, tintColor, 'Profile'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="md-person" size={verticalScale(25)} color={tintColor} />
      )
    }
  }
}, {
  initialRouteName: 'Featured',
  backBehavior: 'initialRoute',
  swipeEnabled: false,
  lazy: false,
  tabBarOptions: {
    activeTintColor: common.theme.palette.secondary,
    inactiveTintColor: common.theme.tabTitle,
    style: {
      backgroundColor: common.theme.container,
      height: verticalScale(49)
    }
  }
});

const SwitchNav = createSwitchNavigator({
  Splash: Splash,
  AuthStackNav: AuthStackNav,
  AppTabNav: AppTabNav
}, {
  initialRouteName: 'Splash'
});

const AppContainer = createAppContainer(SwitchNav);

const theme = {
  Input: {
    inputContainerStyle: {
      borderBottomColor: undefined,
      borderBottomWidth: undefined,
      borderRadius: verticalScale(12)
    },
    leftIconContainerStyle: {
      marginRight: verticalScale(8)
    }
  }
};

const getActiveRouteName = (state) => {
  const index = !!state.routes && state.index != null && state.index;
  if (Number.isInteger(index)) {
      return getActiveRouteName(state.routes[index]);
  }
  return state.routeName;
};

import ThemeStatusBar from './src/components/theme/StatusBar';
import { changeStatusBar } from './src/controllers/common/actions';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ThemeStatusBar />
          <AppContainer onNavigationStateChange={(prevState, curState) => {
            switch (getActiveRouteName(curState)) {
              case 'Splash':
              case 'Discover':
              case 'SaleProduct':
              case 'PopularProduct':
                store.dispatch(changeStatusBar({ translucent: true }));
                break;
              default:
                store.dispatch(changeStatusBar({ translucent: false }));
                break;
            }
          }} />
          <LoadingSpinner />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
