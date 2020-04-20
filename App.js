/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

console.disableYellowBox = true;

import React, { Component } from 'react';
import { Animated, Easing, Text } from 'react-native';
import { Icon, ThemeProvider } from 'react-native-elements';

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import { combineReducers } from 'redux';

import commonReducer from './src/controller/common/reducer';
import authReducer from './src/controller/auth/reducer';
import artistReducer from './src/controller/artist/reducer';
import productReducer from './src/controller/product/reducer';
import relationReducer from './src/controller/relation/reducer';
import reviewReducer from './src/controller/review/reducer';
import discoverReducer from './src/controller/discover/reducer';
import calendarReducer from './src/controller/calendar/reducer';
import chatReducer from './src/controller/chat/reducer';
import serviceReducer from './src/controller/service/reducer';

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

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import apiMiddleware from './src/middleware/api';

const store = createStore(appReducer, applyMiddleware(thunk, apiMiddleware));
store.dispatch(getProducts());

import Splash from './src/scene/Splash';

import SignIn from './src/scene/auth/SignIn';
import CreateAccount from './src/scene/auth/CreateAccount';
import ImportMedia from './src/scene/auth/ImportMedia';
import AccessLocation from './src/scene/auth/AccessLocation';
import SuggestedArtists from './src/scene/auth/SuggestedArtists';

import FixedTabBar from './src/component/FixedTabBar';
import Artists from './src/scene/featured/Artists';
import Products from './src/scene/featured/Products';

import Artist from './src/scene/featured/Artist';
import Relations from './src/scene/featured/Relations';
import Reviews from './src/scene/featured/Reviews';
import SaleProduct from './src/scene/featured/SaleProduct';
import PopularProduct from './src/scene/featured/PopularProduct';
import Discover from './src/scene/tab/Discover';
import Bookings from './src/scene/calendar/Bookings';
import Booking from './src/scene/calendar/Booking';
import Notifications from './src/scene/calendar/Notifications';
import Notification from './src/scene/calendar/Notification';
import Account from './src/scene/profile/Account';
import AddService from './src/scene/profile/AddService';
import EditInfo from './src/scene/profile/EditInfo';
import Chats from './src/scene/profile/Chats';
import Chat from './src/scene/profile/Chat';
import Settings from './src/scene/profile/Settings';

import LoadingSpinner from './src/component/LoadingSpinner';
import { Provider } from 'react-redux';
import { getProducts } from './src/controller/product/actions';

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

import EStyleSheet from 'react-native-extended-stylesheet';

const topTabStyles = EStyleSheet.create({
  tabBar: {
    backgroundColor: '$container'
  },
  label: {
    margin: 0,
    paddingBottom: '2rem',
    fontFamily: 'Lato',
    fontSize: '24rem',
    fontWeight: 'bold'
  },
  indicator: {
    backgroundColor: '$secondaryColor'
  }
});

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

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
    style: topTabStyles.tabBar,
    activeTintColor: EStyleSheet.value('$secondaryColor'),
    inactiveTintColor: EStyleSheet.value('$grey0Color'),
    labelStyle: topTabStyles.label,
    upperCaseLabel: false,
    indicatorStyle: topTabStyles.indicator
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
  },
  navigationOptions: ({ navigation }) => {
    let tabBarVisible = false;
    if (navigation.state.routes) {
      const currentRoute = navigation.state.routes[navigation.state.routes.length - 1].routeName;
      if (currentRoute === 'Account')
        tabBarVisible = true;
    }
    return { tabBarVisible };
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

function getTabBarLabel(focused, tintColor, title) {
  if (focused) {
    return <Text style={{
      textAlign: 'center',
      color: tintColor,
      fontFamily: 'Roboto',
      fontSize: EStyleSheet.value('10rem')
    }}>{title}</Text>;
  } else {
    return null;
  }
}

const bottomTabStyles = EStyleSheet.create({
  tabBar: {
    height: '49rem',
    backgroundColor: '$container'
  }
});

const AppTabNav = createBottomTabNavigator({
  Featured: {
    screen: FeaturedStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabBarLabel(focused, tintColor, 'Featured'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="font-awesome" name="star" size={EStyleSheet.value('25rem')} color={tintColor} />
      )
    }
  },
  Discover: {
    screen: DiscoverStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabBarLabel(focused, tintColor, 'Discover'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-search" size={EStyleSheet.value('25rem')} color={tintColor} />
      )
    }
  },
  Calendar: {
    screen: CalendarStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabBarLabel(focused, tintColor, 'Calendar'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-calendar" size={EStyleSheet.value('25rem')} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabBarLabel(focused, tintColor, 'Profile'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="md-person" size={EStyleSheet.value('25rem')} color={tintColor} />
      )
    }
  }
}, {
  initialRouteName: 'Featured',
  backBehavior: 'initialRoute',
  swipeEnabled: false,
  lazy: false,
  tabBarOptions: {
    activeTintColor: EStyleSheet.value('$secondaryColor'),
    inactiveTintColor: EStyleSheet.value('$tabTitle'),
    style: bottomTabStyles.tabBar
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
      borderRadius: EStyleSheet.value('12rem')
    },
    leftIconContainerStyle: {
      marginRight: EStyleSheet.value('8rem')
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

import ThemeStatusBar from './src/component/theme/StatusBar';
import { changeStatusBar } from './src/controller/common/actions';

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
