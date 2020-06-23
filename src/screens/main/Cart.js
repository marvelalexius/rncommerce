import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Text,
  Content,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Left,
  Right,
  Body,
} from 'native-base';

import {connect} from 'react-redux';
import {actions} from './../../modules/reducers';

import ProductCard from './ProductCard';

import api from './../../utils/api';
import config from './../../config';

const _checkout = async (cart, navigation, dispatch) => {
  const {data: res} = await api.post('/transaction', cart);
  console.log(res);
  dispatch(actions.resetCart());
  navigation.navigate('WebViewScreen', {
    uri: `${config.api.host}/api/payment/transaction/${res.data}`,
  });
};

const Cart = ({dispatch, cart, navigation}) => {
  useEffect(() => {
    console.log('cart loop ?');
    dispatch(actions.getCart());
  }, [dispatch]);

  return (
    <Container>
      <Header searchBar rounded>
        <Left>
          <Button transparent>
            <Icon
              name="arrow-back"
              onPress={() => navigation.navigate('Home')}
            />
          </Button>
        </Left>
        <Item style={styles.searchbar}>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Content>
        {cart !== undefined ? (
          cart.map((item, key) => {
            return <ProductCard product={item} key={key} />;
          })
        ) : (
          <Text>Whoops! you doesn't have any cart</Text>
        )}
        <Button onPress={() => _checkout(cart, navigation, dispatch)}>
          <Text>Proceed To Payment</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  Card: {
    marginVertical: 10,
  },
  searchbar: {
    width: 100,
  },
});

const mapStateToProps = state => ({
  cart: state.cart.products,
});

export default connect(mapStateToProps)(Cart);
