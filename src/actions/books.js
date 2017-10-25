export const SEARCH = 'BOOK_SEARCH';
export const SEARCH_REQUEST  = 'BOOK_SEARCH_REQUEST';
export const SEARCH_FAIL = 'BOOK_SEARCH_FAIL';
export const ADD_NOT_FOUND_ITEM = 'BOOK_ADD_NOT_FOUND_ITEM';
export const QUEUE_ITEM = 'BOOK_QUEUE_ITEM';
export const UPDATE_QUEUED_ITEM_QUANTITY = 'BOOK_UPDATE_QUEUED_ITEM_QUANTITY';
export const SAVE_QUEUED_ITEM = 'SAVE_QUEUED_ITEM';

export function search(isbn) {
  return {
    type: SEARCH,
    isbn,
  };
}

export function searchRequest(isbn) {
  return {
    type: SEARCH_REQUEST,
    isbn,
  };
}

export function searchFail(isbn, error) {
  return {
    type: SEARCH_FAIL,
    isbn,
    error,
  };
}

export function addNotFoundItem(isbn) {
  return {
    type: ADD_NOT_FOUND_ITEM,
    isbn,
  };
}

export function queueItem(isbn, info) {
  return {
    type: QUEUE_ITEM,
    isbn,
    info,
  };
}

export function updateQueuedItemQuantity(isbn, quantity) {
  return {
    type: UPDATE_QUEUED_ITEM_QUANTITY,
    isbn,
    quantity,
  };
}

export function saveQueuedItem() {
  return {
    type: SAVE_QUEUED_ITEM,
  };
}
