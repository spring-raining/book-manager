import React from 'react';
import { Share, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Papa from 'papaparse';

import { Container, Button, H3, Text, Header, Title, Body, Left, Right, Content, List, ListItem, Fab, Icon, CheckBox } from "native-base";

const exportFields = [
  { name: 'タイトル', value: 'title' },
  { name: '著者名', value: 'authors' },
  { name: '発刊日', value: 'publishedDate' },
  { name: 'ISBN', value: 'isbn' },
  { name: '購入数', value: 'quantity' },
];

@connect(
  state => ({
    books: state.books,
  })
)
export default class Export extends React.Component {

  state = {
    availableFields: ['title', 'authors', 'publishedDate', 'isbn', 'quantity'],
  };

  handleToggleExportFieldButtonPress = (value) => {
    const oldFields = this.state.availableFields
    this.setState({
      availableFields: exportFields.filter(field =>
        field.value === value? !oldFields.includes(field.value) : oldFields.includes(field.value)
      ).map(field => field.value),
    });
  };

  handleSaveCSVButtonPress = () => {
    const { books } = this.props;

    const fields = this.state.availableFields;
    const data = books.savedItems.map(item =>
      Object.assign({}, item.info, {
        quantity: item.quantity,
        isbn: item.isbn,
      })
    );
    const csv = Papa.unparse({
      fields,
      data,
    });
    console.log(csv);
    Share.share({ message: csv, title: 'book.csv' });
  };

  render() {
    const { books, navigation } = this.props;
    const { availableFields } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>ファイル</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <List>
            {exportFields.map(field => (
              <ListItem buttton noBorder key={field.value}
                onPress={() => this.handleToggleExportFieldButtonPress(field.value)}
              >
                <CheckBox checked={availableFields.includes(field.value)} />
                <Body>
                  <Text>{field.name}</Text>
                </Body>
              </ListItem>
            ))}
            <Button block style={styles.blockButton} onPress={this.handleSaveCSVButtonPress}>
              <Text>CSVファイルで保存する</Text>
            </Button>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#fff',
  },
  blockButton: {
    marginHorizontal: 18,
  },
});
