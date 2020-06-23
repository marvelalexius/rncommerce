import 'react-native-gesture-handler';
import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './main/Home';
import Profile from './main/Profile';
import Wishlist from './main/Wishlist';
import Cart from './main/Cart';
import WebViewScreen from './main/WebViewScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      {/* <Drawer.Screen name="Login" component={Login} /> */}
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={MyDrawer} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
    </Stack.Navigator>
  );
}

export default class Routes extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );
  }
}
