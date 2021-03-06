import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
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
  Badge,
} from 'native-base';
import {useForm} from 'react-hook-form';

import {connect} from 'react-redux';
import {actions} from './../../modules/reducers';

import ProductCard from './ProductCard';

const Home = ({dispatch, user, products, cart, navigation}) => {
  useEffect(() => {
    console.log('home loop ?');
    dispatch(actions.productRequest());
    dispatch(actions.getCart());
  }, [dispatch]);

  return (
    <Container>
      <Header searchBar rounded>
        <Item style={styles.searchbar}>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
        <Right>
          <Button transparent>
            {cart.length !== 0 ? (
              <Badge style={styles.cartBadge}>
                <Text>{cart.length}</Text>
              </Badge>
            ) : null}
            <Icon name="cart" onPress={() => navigation.navigate('Cart')} />
          </Button>
          <Button transparent>
            <Icon
              name="heart"
              onPress={() => navigation.navigate('Wishlist')}
            />
          </Button>
        </Right>
      </Header>
      <Content>
        <Text style={styles.title}>Welcome back, {user.name}</Text>
        {products !== undefined
          ? products.map((item, key) => {
              return <ProductCard product={item} key={key} />;
            })
          : null}
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
  cartBadge: {
    position: 'absolute',
    zIndex: 1,
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  products: state.product.products,
  cart: state.cart.products,
});

export default connect(mapStateToProps)(Home);
