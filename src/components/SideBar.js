import React from 'react';
import { Dimensions, Platform, StyleSheet, Image } from 'react-native';
import { Container, Content, List, ListItem, Left, Text } from "native-base";

const listData = [
  { name: 'ホーム', route: 'Home'},
  { name: 'ファイル', route: 'Export'},
];

export default class SideBar extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Content style={styles.sideBarContent}>
          <Image source={null} style={styles.drawerCover}>
            <Image square source={null} style={styles.drawerImage} />
          </Image>
          <List dataArray={listData}
            renderRow={data =>
              <ListItem button noBorder
                onPress={() => navigation.navigate(data.route)}
              >
                <Left>
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  sideBarContent: {
    flex: 1,
    backgroundColor: '#fff',
    top: -1,
  },
  drawerCover: {
    alignSelf: "stretch",
    // resizeMode: 'cover',
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
});
