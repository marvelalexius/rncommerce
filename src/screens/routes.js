import 'react-native-gesture-handler';
import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './main/Home';
import Pasien from './main/Pasien';
import Profile from './main/Profile';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Input Data Pasien" component={Pasien} />
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
