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

import {connect} from 'react-redux';
import {actions} from './../../modules/reducers';

const _addToCart = (product, dispatch) => {
  let cart = {
    ...product,
    quantity: 1,
  };

  dispatch(actions.addToCart(cart));
};

const _buyNow = (product, user) => {
  let carts = [];
  let cart = {
    ...product,
    quantity: 1,
  };
  carts.push(cart);
  console.log(carts);

  let {token} = user;
  const url = `${config.api.host}/api/transaction`;
  console.log(url);

  let config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  axios
    .post(url, carts, config)
    .then(res => {
      Alert.alert(res.data.message);
    })
    .catch(err => {
      console.log(err);
    });
};

const _addToWishlist = (product, dispatch) => {
  //   let {token, user} = this.props;
  //   const Url = `${url}/api/wishlist`;
  //   console.log(Url);
  //   let config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + token,
  //     },
  //   };
  //   let data = {
  //     user_id: user.id,
  //     product_id: product.id,
  //   };
  //   axios
  //     .post(Url, data, config)
  //     .then(res => {
  //       Alert.alert(res.data.message);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  let wishlist = {
    ...product,
    quantity: 1,
  };

  dispatch(actions.addToWishlist(wishlist));
};

const ProductCard = ({product, user, dispatch}) => {
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
          <Text style={styles.productPrice}>{product.price}</Text>
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
            onPress={() => _addToCart(product, dispatch)}
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
  user: state.user.user,
  wishlists: state.wishlist.wishlists,
});

export default connect(mapStateToProps)(ProductCard);
