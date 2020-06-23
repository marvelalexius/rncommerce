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

const Wishlist = ({dispatch, wishlist, navigation}) => {
  useEffect(() => {
    console.log('wishlist loop ?');
    dispatch(actions.getWishlist());
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
        {wishlist !== undefined ? (
          wishlist.map((item, key) => {
            return <ProductCard product={item} key={key} />;
          })
        ) : (
          <Text>Whoops! you doesn't have any wishlist</Text>
        )}
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
  wishlist: state.wishlist.wishlist,
});

export default connect(mapStateToProps)(Wishlist);
