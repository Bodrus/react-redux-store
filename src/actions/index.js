
const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUESTET'
  }
};

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
};

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

const onIncrem = (id) => {
  console.log('onIncrem', id);
};

const onDecrem = (id) => {
  console.log('onDecrem', id)
};

const onDelete = (id) => {
  console.log('onDelete', id)
};

const bookAddedtoCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  }
};

export {
  fetchBooks,
  onDecrem,
  onDelete,
  onIncrem,
  bookAddedtoCart
};