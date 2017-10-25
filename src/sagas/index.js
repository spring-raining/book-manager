import { fork, put, takeEvery, throttle, select } from 'redux-saga/effects';

import * as BooksAction from './../actions/books';

const searchBook = function* (action) {
  try {
    yield put(BooksAction.searchRequest(action.isbn));

    const response = yield fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${action.isbn}`);
    const json = yield response.json();
    if (!json.items || json.items.length === 0) {
      yield put(BooksAction.addNotFoundItem(action.isbn));
    }
    else {
      const item = json.items[0];
      yield put(BooksAction.queueItem(action.isbn, item.volumeInfo));
    }
  } catch (e) {
    yield put(BooksAction.searchFail(action.isbn, e));
  }
}

const watchBooksAction = function* () {
  yield throttle(1000, BooksAction.SEARCH, searchBook);
}

const saga = function* () {
  yield [
    fork(watchBooksAction),
  ];
}

export default watchBooksAction;
