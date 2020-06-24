import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {
  Button,
  Container,
  Text,
  Content,
  Item,
  Input,
  Form,
  Footer,
  Icon,
} from 'native-base';
import {useForm} from 'react-hook-form';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import config from './../../../config';
import axios from 'axios';
import api from './../../../utils/api';

import {connect} from 'react-redux';
import {actions} from './../../../modules/reducers';

const _googleSignIn = async (dispatch, navigation) => {
  console.log(config.api.host);
  GoogleSignin.configure({
    webClientId: config.google.client_id,
    offlineAccess: true,
  });

  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    let data = new FormData();

    data.append('google_token', userInfo.idToken);

    const {data: res} = await api.post('/auth/google/login', data);
    const token = res.access_token;
    const user = res.user;
    dispatch(actions.userLoggedIn(user, token));
    navigation.navigate('Home');
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('Sign in cancelled by User');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('Sign in is in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Error Sign in, Play services is outdated');
    }
    console.log(error);
  }
};

const _handleOnSubmit = async (dispatch, navigation) => {
  this.setState({isLoading: true});
  const {email, password} = this.state;
  const url = `${config.api.host}/api/auth/login`;
  let postConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let data = new FormData();

  data.append('email', email);
  data.append('password', password);

  axios
    .post(url, data, postConfig)
    .then(res => {
      const token = res.data.access_token;
      const user = res.data.user;
      this.props.userLoggedIn(user, token);
      this.props.navigation.navigate('Home');
    })
    .catch(err => {
      this.setState({isLoading: false});
      console.log(err);
    });
};

const Login = ({dispatch, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigninInProgress, setSignInProgress] = useState(false);

  return (
    <Container>
      <Content style={styles.wrapper}>
        <Text style={styles.title}>Lupabapak</Text>
        <Form>
          <Item regular style={[styles.inputWrapper, styles.loginBox]}>
            <Input
              style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor="#C4C4BC"
              value={email}
              onChangeText={textEmail => setEmail(textEmail)}
            />
          </Item>
          <Item regular style={styles.inputWrapper}>
            <Input
              style={styles.inputBox}
              secureTextEntry={true}
              value={password}
              placeholder="Password"
              placeholderTextColor="#C4C4BC"
              onChangeText={textPassword => setPassword(textPassword)}
            />
          </Item>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
          <Button
            style={[styles.buttonstyles, styles.loginButton]}
            onPress={() => _handleOnSubmit(dispatch, navigation)}>
            <Text style={styles.textButton}>Log In</Text>
          </Button>
        </Form>
        <Text style={styles.textSeparator}>OR</Text>
        <GoogleSigninButton
          style={styles.loginGoogleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            setSignInProgress(true);
            _googleSignIn(dispatch, navigation);
          }}
          disabled={isSigninInProgress}
        />
      </Content>
      <View style={styles.divider}>
        <Footer style={styles.footer}>
          <Text style={styles.footerSignUp}>
            Don't have an account?{' '}
            <Text
              style={styles.signUpButton}
              onPress={() => navigation.navigate('Signup')}>
              Sign Up.
            </Text>
          </Text>
        </Footer>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    height: '100%',
    paddingTop: 100,
    padding: 10,
    backgroundColor: '#f8f8f6',
  },

  title: {
    fontWeight: 'bold',
    color: '#D51D48',
    fontSize: 55,
    textAlign: 'center',
    marginBottom: 24,
  },

  inputWrapper: {
    borderWidth: 1,
    // marginLeft: 20,
    width: 340,
    height: 30,
    backgroundColor: '#EBEBE7',
    borderRadius: 3,
  },

  loginBox: {
    marginBottom: 10,
  },

  inputBox: {
    fontSize: 12,
  },

  textAccount: {
    textAlign: 'center',
    marginVertical: 14,
    justifyContent: 'space-between',
    fontSize: 15,
    marginTop: 30,
  },

  buttonstyles: {
    backgroundColor: '#D51D48',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    height: 35,
  },

  loginGoogleButton: {
    width: 192,
    height: 48,
  },

  loginButton: {
    marginTop: 30,
  },

  textButton: {
    fontSize: 12,
    textTransform: 'capitalize',
  },

  textSeparator: {
    textAlign: 'center',
    color: '#C4C4BC',
  },

  forgotPassword: {
    textAlign: 'right',
    fontSize: 12,
    color: '#D51D48',
    marginTop: 10,
  },

  footer: {
    backgroundColor: '#f8f8f6',
    height: 40,
  },

  divider: {
    borderTopColor: '#EBEBE7',
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  footerSignUp: {
    fontSize: 12,
    textAlignVertical: 'center',
    color: '#C4C4BC',
  },

  signUpButton: {
    color: '#D51D48',
    fontSize: 12,
  },
});

export default connect()(Login);
