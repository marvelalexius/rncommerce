import React, {Component} from 'react';
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
import config from './../../config';
import axios from 'axios';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      role: '',
      userInfo: null,
    };
  }

  _handleChangeInput = field => text => {
    this.setState({[field]: text});
  };

  _googleSignIn = async () => {
    const url = `${config.api.host}/api/auth/google/login`;
    GoogleSignin.configure({
      webClientId: config.google.client_id,
      offlineAccess: true,
    });

    let postConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const userToken = await GoogleSignin.getTokens();
      console.log(userToken.accessToken);

      let data = new FormData();

      data.append('google_token', userToken.accessToken);

      axios
        .post(url, data, postConfig)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
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

  // _handleOnSubmit = async () => {
  //   this.setState({isLoading: true});
  //   const {email, password} = this.state;
  //   const Url = `${url}/api/auth/login`;
  //   console.log(Url);
  //   let config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   let data = new FormData();

  //   data.append('email', email);
  //   data.append('password', password);

  //   axios
  //     .post(Url, data, config)
  //     .then(res => {
  //       const token = res.data.access_token;
  //       const user = res.data.user;
  //       this.props.userLoggedIn(user, token);
  //       this.props.navigation.navigate('Home');
  //     })
  //     .catch(err => {
  //       this.setState({isLoading: false});
  //       console.log(err);
  //     });
  // };

  render() {
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
                value={this.state.email}
                onChangeText={this._handleChangeInput('email')}
              />
            </Item>
            <Item regular style={styles.inputWrapper}>
              <Input
                style={styles.inputBox}
                secureTextEntry={true}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor="#C4C4BC"
                onChangeText={this._handleChangeInput('password')}
              />
            </Item>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
            <Button
              style={[styles.buttonstyles, styles.loginButton]}
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.textButton}>Log In</Text>
            </Button>
          </Form>
          <Text style={styles.textSeparator}>OR</Text>
          <GoogleSigninButton
            style={styles.loginGoogleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => this._googleSignIn()}
            disabled={this.state.isSigninInProgress}
          />
        </Content>
        <View style={styles.divider}>
          <Footer style={styles.footer}>
            <Text style={styles.footerSignUp}>
              Don't have an account?{' '}
              <Text
                style={styles.signUpButton}
                onPress={() => this.props.navigation.navigate('Signup')}>
                Sign Up.
              </Text>
            </Text>
          </Footer>
        </View>
      </Container>
    );
  }
}

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
