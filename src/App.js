import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Root } from 'native-base';

import Home from './bm/Home';
import Scan from './bm/Scan';
import Export from './bm/Export';
import SideBar from './components/SideBar';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  Export: { screen: Export },
}, {
  initialRouteName: 'Home',
  contentOptions: {
    activeTintColor: '#e91e63',
  },
  contentComponent: props => <SideBar {...props} />
});

const AppNavigator = StackNavigator({
  Drawer: { screen: Drawer },
  Scan: { screen: Scan },
  Export: { screen: Export },
}, {
  initialRouteName: 'Drawer',
  headerMode: 'none',
});

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}
