import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Container, Button, H3, Text, Header, Title, Body, Left, Right, Content, List, ListItem, Fab, Icon, Grid, Row } from "native-base";

@connect(
  state => ({
    books: state.books,
  })
)
export default class Home extends React.Component {
  render() {
    const { books, navigation } = this.props;

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
            <Title>Book Manager</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <List dataArray={books.savedItems}
            renderRow={item => (
              <ListItem>
                <Left>
                  <Grid>
                    <Row><H3>{item.info.title}</H3></Row>
                    <Row><Text>{item.info.authors.join(', ')}</Text></Row>
                  </Grid>
                </Left>
                <Right><Text>{item.quantity}</Text></Right>
              </ListItem>
            )}
          />
        </Content>
        <Fab position="bottomRight" onPress={() => navigation.navigate('Scan')}>
          <Icon name="md-camera" />
        </Fab>
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
});
