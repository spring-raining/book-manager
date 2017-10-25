import React from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';

import App from './src/App';
import createStore from './src/store';

const store = createStore();

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  loadAsync = async () => {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
