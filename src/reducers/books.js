import * as BooksAction from './../actions/books';

const initialState = {
  searchingItems: [],
  notFoundItems: [],
  queuedItems: [],
  savedItems: [],
};

const merge = (oldObj) => (newObj) => Object.assign({}, oldObj, newObj);

function getSearchingItem(isbn) {
  return { isbn };
}

function getNotFountItem(isbn) {
  return { isbn };
}

function getQueuedItem(isbn, info, quantity = 1) {
  return { isbn, info, quantity };
}

function getSavedItem(isbn, info, quantity) {
  return { isbn, info, quantity };
}

function mergeSavedItems(oldItems, newItems) {
  const oldItemIsbns = oldItems.map(item => item.isbn);
  const newItemIsbns = newItems.map(item => item.isbn);
  const newItemObj = newItems.reduce((obj, val) => {
    obj[val.isbn] = val;
    return obj;
  }, {});
  return [].concat(
    oldItems.map(item => {
      if (newItemIsbns.includes(item.isbn)) {
        return merge(item)({ quantity: item.quantity + newItemObj[item.isbn].quantity});
      }
      return item;
    }),
    newItems.filter(item => !oldItemIsbns.includes(item.isbn) && item.quantity > 0)
  );
}

export default function books(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case BooksAction.SEARCH_REQUEST:
      return merge(state)({
        searchingItems: [].concat(state.searchingItems, [getSearchingItem(action.isbn)]),
      });
    case BooksAction.ADD_NOT_FOUND_ITEM:
      return merge(state)({
        searchingItems: state.searchingItems.filter(item => item.isbn !== action.isbn),
        notFoundItems: [].concat(state.notFoundItems, [getNotFountItem(action.isbn)]),
      });
    case BooksAction.QUEUE_ITEM:
      return merge(state)({
        searchingItems: state.searchingItems.filter(item => item.isbn !== action.isbn),
        queuedItems: [].concat(state.queuedItems, [getQueuedItem(action.isbn, action.info)]),
      });
    case BooksAction.UPDATE_QUEUED_ITEM_QUANTITY:
      return merge(state)({
        queuedItems: state.queuedItems.map(item => item.isbn === action.isbn
          ? merge(item)({ quantity: action.quantity })
          : item
        ),
      });
    case BooksAction.SAVE_QUEUED_ITEM:
      return merge(state)({
        searchingItems: [],
        notFoundItems: [],
        queuedItems: [],
        savedItems: mergeSavedItems(state.savedItems, state.queuedItems),
      });
    default:
      return state;
  }
}
