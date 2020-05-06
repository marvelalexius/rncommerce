import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class Divider extends Component {
  render() {
    return (
      <View style={StyleSheet.flatten([styles.container, this.props.style])} />
    );
  }
}

const styles = {
  container: {
    height: StyleSheet.hairlineWidth,
  },
};

export default Divider;
