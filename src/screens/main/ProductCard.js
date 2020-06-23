import React, {Component} from 'react';
import {StyleSheet, Alert, Image} from 'react-native';
import {
  Card,
  CardItem,
  Left,
  Body,
  Subtitle,
  Right,
  Title,
  Button,
  Icon,
  Text,
} from 'native-base';
import axios from 'axios';
import numeral from 'numeral';

import {connect} from 'react-redux';
import {actions} from './../../modules/reducers';

const _addToCart = (product, cart, dispatch) => {
  let carts = [];
  if (cart.length !== 0) {
    cart.map(cart_product => {
      console.log(cart_product.pivot.quantity);
      if (cart_product.id === product.id) {
        carts.push({
          ...product,
          quantity: cart_product.pivot.quantity + 1,
        });
      } else {
        carts.push({
          ...product,
          quantity: 1,
        });
      }
    });
  } else {
    carts.push({
      ...product,
      quantity: 1,
    });
  }

  dispatch(actions.addToCart(carts));
  Alert.alert('Added to Cart');
};

const _addToWishlist = (product, dispatch) => {
  dispatch(actions.toggleWishlist(product.id));
  Alert.alert('Added to wishlist');
};

const ProductCard = ({product, cart, dispatch}) => {
  return (
    <Card>
      <CardItem header style={styles.cardCover}>
        <Image
          source={{uri: 'https://picsum.photos/700'}}
          style={styles.cardCoverImage}
        />
      </CardItem>
      <CardItem cardBody style={styles.cardBody}>
        <Body>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productDescription}>
            {product.description.substring(0, 10)}
          </Text>
          <Text style={styles.productPrice}>
            {numeral(product.price).format('0,0')}
          </Text>
        </Body>
        <Right style={styles.bodyRightButton}>
          <Button
            iconLeft
            transparent
            style={styles.buyButton}
            onPress={() => _addToWishlist(product, dispatch)}>
            <Icon name="ios-heart-empty" />
          </Button>
          <Button
            primary
            onPress={() => _addToCart(product, cart, dispatch)}
            style={styles.buyButton}>
            <Text>Buy</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardCover: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  cardCoverImage: {
    height: 240,
    width: '100%',
  },

  cardBody: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bodyRightButton: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buyButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 8,
  },

  productTitle: {
    color: 'rgb(82, 82, 82)',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  productDescription: {
    fontSize: 12,
    color: 'rgb(82, 82, 82)',
    lineHeight: 18,
  },

  productPrice: {
    color: 'rgb(82, 82, 82)',
    fontSize: 16,
    lineHeight: 24,
  },
});

const mapStateToProps = state => ({
  cart: state.cart.products,
});

export default connect(mapStateToProps)(ProductCard);
