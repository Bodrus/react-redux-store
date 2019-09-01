import update from 'immutability-helper';

const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 750
};

const updateCartItem = (cartItems, book, itemIndex) => {
  if (itemIndex === -1) {
    const newItem = {
      id: book.id,
      title: book.title,
      count: 1,
      total: book.price
    };
    return [...cartItems, newItem]
  }

  const { count, total } = cartItems[itemIndex]
  const newCartItems = update(cartItems, {
    [itemIndex]: {
      $set: {
        count: count + 1,
        total: total + book.price,
        id: book.id,
        title: book.title
      }
    }
  });

  return newCartItems;

}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'FETCH_BOOKS_REQUESTET':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      }
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      }

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      }

    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find((book) => book.id === bookId);
      const itemIndex = state.cartItems.findIndex(({ id }) => id === bookId);

      return {
        ...state,
        cartItems: updateCartItem(state.cartItems, book, itemIndex)
      }

    default:
      return state;
  }
};

export default reducer;