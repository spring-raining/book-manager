import React from 'react';
import { Vibration, Dimensions, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, H3, Text, Header, Title, Body, Left, Right, Content, View, List, ListItem, Footer, FooterTab, Icon } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';

import { search, updateQueuedItemQuantity, saveQueuedItem } from './../actions/books';

@connect(
  state => ({
    books: state.books,
  })
)
export default class Scan extends React.Component {

  state = {
    hasCameraPermission: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  handleBarCodeRead = ({ type, data }) => {
    const { dispatch, books } = this.props;
    const isbn = parseInt(data);

    const addedIsbn = [].concat(
      books.searchingItems.map(item => item.isbn),
      books.queuedItems.map(item => item.isbn),
      books.notFoundItems.map(item => item.isbn)
    );

    if (!addedIsbn.includes(isbn) && isbn > 0) {
      Vibration.vibrate(100, false);
      dispatch(search(isbn));
    }
  };

  handleAddBookButtonPress = (item) => {
    const { dispatch } = this.props;
    dispatch(updateQueuedItemQuantity(item.isbn, item.quantity + 1));
  };

  handleRemoveBookButtonPress = (item) => {
    const { dispatch } = this.props;
    if (item.quantity < 1) {
      return;
    }
    dispatch(updateQueuedItemQuantity(item.isbn, item.quantity - 1));
  };

  handleSaveButtonPress = (item) => {
    const { dispatch, navigation } = this.props;
    dispatch(saveQueuedItem());
    navigation.goBack();
  }

  renderCameraView = () => {
    return (
      <BarCodeScanner style={StyleSheet.absoluteFill}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
        onBarCodeRead={this.handleBarCodeRead}
      />
    );
  };

  renderBookListRow = (item) => {
    return (
      <ListItem key={item.isbn}>
        <Left><Text>{item.info.title}</Text></Left>
        <Right>{this.renderBookCounter(item)}</Right>
      </ListItem>
    );
  }

  renderBookCounter = (item) => {
    return (
      <View style={styles.bookCounterContainer}>
        <Button transparent dark onPress={() => this.handleRemoveBookButtonPress(item)}>
          <Icon name="md-remove" />
        </Button>
        <Text>{item.quantity}</Text>
        <Button transparent dark onPress={() => this.handleAddBookButtonPress(item)}>
          <Icon name="md-add" />
        </Button>
      </View>
    );
  }

  render() {
    const { books } = this.props;

    const statusText =
      this.state.hasCameraPermission === null
        ? <Body><Text style={styles.hintText}>カメラへのアクセス権を取得しています</Text></Body>
      : this.state.hasCameraPermission === false
        ? <Body><Text style={styles.hint}>カメラへのアクセス権を取得できませんでした</Text></Body>
      : books.searchingItems.length > 0
        ? <Body><Text style={styles.hintText}>検索中…</Text></Body>
      : (books.searchingItems.length === 0 && books.queuedItems.length === 0)
        ? <Body><Text style={styles.hintText}>バーコードをスキャン</Text></Body>
      : null;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>スキャン</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.content}>
          <View style={styles.cameraArea}>
            {this.state.hasCameraPermission === true &&
              this.renderCameraView()
            }
          </View>
          <Content>
            <View style={styles.scannedListArea}>
              <List style={styles.scannedList}>
                {books.queuedItems.map(item => this.renderBookListRow(item))}
                {statusText}
              </List>
            </View>
          </Content>
        </View>
        {books.queuedItems.length > 0 &&
          <Footer>
            <FooterTab>
              <Button full onPress={this.handleSaveButtonPress}>
                <Text>書籍を追加</Text>
              </Button>
            </FooterTab>
          </Footer>
        }
      </Container>
    );
  }
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraArea: {
    height: deviceWidth * 0.6,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  scannedListArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hintText: {
    margin: 20,
    color: '#888',
  },
  scannedList: {
    flex: 1,
  },
  bookCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
