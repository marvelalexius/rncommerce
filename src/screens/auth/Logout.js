import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Spinner} from 'native-base';
import {GoogleSignin} from '@react-native-community/google-signin';

import {connect} from 'react-redux';
import {actions} from './../../modules/reducers';

const _googleLogout = async (dispatch, navigation, setLoading) => {
  setLoading(true);
  await GoogleSignin.signOut();
  dispatch(actions.userLoggedOut());
  setLoading(false);
  navigation.navigate('Login');
};

const Logout = ({dispatch, navigation}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _googleLogout(dispatch, navigation, setLoading);
  }, [dispatch, setLoading, navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner color="#578DDE" animating={loading} />
    </View>
  );
};

export default connect()(Logout);
