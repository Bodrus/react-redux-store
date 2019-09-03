
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

export const bookRemoveFromCart = (bookId) => {
  return {
    type: 'BOOK_REMOVE_FROM_CART',
    payload: bookId
  }
}

export const allBooksRemoveFromCart = (bookId) => {
  return {
    type: 'ALL_BOOKS_REMOVE_FROM_CART',
    payload: bookId
  }
}

export const bookAddedtoCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  }
};

export {
  fetchBooks,
};