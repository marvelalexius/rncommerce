import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text, Content} from 'native-base';
import {useForm} from 'react-hook-form';

import {connect} from 'react-redux';
import {actions} from './../../modules/reducers';

import ProductCard from './ProductCard';

const Home = ({dispatch, user, products}) => {
  useEffect(() => {
    console.log(user);
    console.log(products);
    dispatch(actions.productRequest());
  });

  return (
    <Container>
      <Content>
        <Text style={styles.title}>Welcome back, {user.name}</Text>
        {products.map((item, key) => {
          return <ProductCard product={item} key={key} />;
        })}
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
});

export default connect()(Home);
