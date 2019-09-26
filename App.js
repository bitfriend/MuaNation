/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Animated, Easing, StatusBar, Text } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import {
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import { Icon } from 'react-native-elements';

import colors from './src/components/theme/colors';

import Splash from './src/scenes/Splash';

import SignIn from './src/scenes/auth/SignIn';
import CreateAccount from './src/scenes/auth/CreateAccount';
import ImportMedia from './src/scenes/auth/ImportMedia';
import AccessLocation from './src/scenes/auth/AccessLocation';
import SuggestedArtists from './src/scenes/auth/SuggestedArtists';

import FixedTabBar from './src/components/FixedTabBar';
import Artists from './src/scenes/featured/Artists';
import Products from './src/scenes/featured/Products';

import ArtistProfile from './src/scenes/featured/ArtistProfile';
import Relations from './src/scenes/featured/Relations';
import Reviews from './src/scenes/featured/Reviews';
import SaleProduct from './src/scenes/featured/SaleProduct';
import PopularProduct from './src/scenes/featured/PopularProduct';
import Discover from './src/scenes/tab/Discover';
import Profile from './src/scenes/tab/Profile';
import Account from './src/scenes/tab/Account';

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
    style: { backgroundColor: 'transparent' },
    activeTintColor: colors.mulberry,
    inactiveTintColor: colors.smokyBlack,
    labelStyle: {
      fontFamily: 'Lato',
      fontSize: 24,
      fontWeight: 'bold',
      margin: 0
    },
    upperCaseLabel: false,
    indicatorStyle: { backgroundColor: colors.mulberry }
  }
});

const DiscoverStackNav = createStackNavigator({
  Discover: { screen: Discover },
}, {
  initialRouteName: 'Discover',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  }
});

const ProfileStackNav = createStackNavigator({
  Profile: { screen: Profile },
}, {
  initialRouteName: 'Profile',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  }
});

const AccountStackNav = createStackNavigator({
  Account: { screen: Account },
}, {
  initialRouteName: 'Account',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  }
});

const FeaturedStackNav = createStackNavigator({
  FeaturedTabNav: { screen: FeaturedTabNav },
  ArtistProfile: { screen: ArtistProfile },
  Relations: { screen: Relations },
  Reviews: { screen: Reviews },
  SaleProduct: { screen: SaleProduct },
  PopularProduct: { screen: PopularProduct }
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
    return <Text style={{ textAlign: 'center', color: tintColor, fontSize: 10 }}>{title}</Text>;
  } else {
    return null;
  }
}

const AppTabNav = createBottomTabNavigator({
  Featured: {
    screen: FeaturedStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabeBarLabel(focused, tintColor, 'Featured'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-star" size={25} color={tintColor} />
      )
    }
  },
  Discover: {
    screen: DiscoverStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabeBarLabel(focused, tintColor, 'Discover'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-search" size={25} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabeBarLabel(focused, tintColor, 'Profile'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-calendar" size={25} color={tintColor} />
      )
    }
  },
  Account: {
    screen: AccountStackNav,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => getTabeBarLabel(focused, tintColor, 'Account'),
      tabBarIcon: ({ tintColor }) => (
        <Icon type="ionicon" name="md-person" size={25} color={tintColor} />
      )
    }
  }
}, {
  initialRouteName: 'Featured',
  backBehavior: 'initialRoute',
  swipeEnabled: false,
  lazy: false,
  tabBarOptions: {
    activeTintColor: colors.mulberry,
    inactiveTintColor: colors.taupe,
  }
});

const SwitchNav = createSwitchNavigator({
  Splash: Splash,
  AuthStackNav: AuthStackNav,
  AppTabNav: AppTabNav
}, {
  initialRouteName: 'Splash'
});

import { combineReducers } from 'redux';

import commonReducer from './src/controllers/common/reducer';
import authReducer from './src/controllers/auth/reducer';
import artistReducer from './src/controllers/artist/reducer';
import productReducer from './src/controllers/product/reducer';
import relationReducer from './src/controllers/relation/reducer';
import reviewReducer from './src/controllers/review/reducer';
import discoverReducer from './src/controllers/discover/reducer';

const appReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  artist: artistReducer,
  product: productReducer,
  relation: relationReducer,
  review: reviewReducer,
  discover: discoverReducer
});

const AppContainer = createAppContainer(SwitchNav);

const store = createStore(appReducer, applyMiddleware(thunk));
store.dispatch(getProducts());

const theme = {
  Input: {
    inputContainerStyle: {
      borderBottomColor: undefined,
      borderBottomWidth: undefined,
      borderRadius: 12
    },
    leftIconContainerStyle: {
      marginRight: 8
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

StatusBar.setBackgroundColor('transparent');
StatusBar.setBarStyle('dark-content');

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppContainer onNavigationStateChange={(prevState, curState) => {
            switch (getActiveRouteName(curState)) {
              case 'Splash':
              case 'Discover':
              case 'SaleProduct':
              case 'PopularProduct':
                StatusBar.setTranslucent(true);
                break;
              default:
                StatusBar.setTranslucent(false);
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
