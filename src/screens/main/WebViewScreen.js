import React from 'react';
import {WebView} from 'react-native-webview';

const WebViewScreen = ({route}) => {
  const {uri} = route.params;
  console.log(uri);

  return <WebView source={{uri: uri}} />;
};

export default WebViewScreen;
