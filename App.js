/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

import {
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import { Icon } from 'react-native-elements';

import Splash from './src/scenes/Splash';

import SignIn from './src/scenes/auth/SignIn';
import ChooseRole from './src/scenes/auth/ChooseRole';
import CreateAccount from './src/scenes/auth/CreateAccount';
import ImportMedia from './src/scenes/auth/ImportMedia';
import AccessLocation from './src/scenes/auth/AccessLocation';
import SuggestedArtists from './src/scenes/auth/SuggestedArtists';

import Artists from './src/scenes/featured/Artists';
import ArtistProfile from './src/scenes/featured/ArtistProfile';
import Relations from './src/scenes/featured/Relations';
import Reviews from './src/scenes/featured/Reviews';
import Products from './src/scenes/featured/Products';
import ProductDetails from './src/scenes/featured/ProductDetails';
import Discover from './src/scenes/tab/Discover';
import Profile from './src/scenes/tab/Profile';
import Account from './src/scenes/tab/Account';

import LoadingSpinner from './src/components/LoadingSpinner';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getArtists } from './src/controllers/artist/actions';
import { getProducts } from './src/controllers/product/actions';
import rootReducer from './src/controllers/reducer';

console.disableYellowBox = true;

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(getArtists());
store.dispatch(getProducts());

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
  Login: { screen: SignIn },
  ChooseRole: { screen: ChooseRole },
  ImportMedia : { screen: ImportMedia },
  AccessLocation: { screen: AccessLocation },
  SuggestedArtists: { screen: SuggestedArtists },
  CreateAccount: { screen: CreateAccount },
}, {
  initialRouteName: 'Login',
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
  tabBarOptions: {
    style: { backgroundColor: 'transparent' },
    activeTintColor: '#ef3475',
    inactiveTintColor: '#97898e',
    labelStyle: {
      fontFamily: 'Lato',
      fontSize: 24,
      fontWeight: 'bold',
      margin: 0
    },
    upperCaseLabel: false,
    indicatorStyle: { backgroundColor: '#ef3475' }
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
  ProductDetails: { screen: ProductDetails }
}, {
  initialRouteName: 'FeaturedTabNav',
  transitionConfig,
  defaultNavigationOptions: {
    header: null
  },
  navigationOptions: ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes) {
      let currentRoute = navigation.state.routes[navigation.state.routes.length - 1].routeName;
      if (currentRoute === 'ProductDetails')
        tabBarVisible = false;
    }
    return { tabBarVisible };
  }
});

const AppTabNav = createBottomTabNavigator({
  Featured: {
    screen: FeaturedStackNav,
    navigationOptions: {
      tabBarLabel: 'Featured',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="material" name="star" size={25} color={tintColor} />
      )
    }
  },
  Discover: {
    screen: DiscoverStackNav,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="material" name="search" size={25} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileStackNav,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="material" name="store" size={25} color={tintColor} />
      )
    }
  },
  Account: {
    screen: AccountStackNav,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="material" name="person" size={25} color={tintColor} />
      )
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#ef3475'
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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
        <LoadingSpinner />
      </Provider>
    );
  }
}

export default App;
