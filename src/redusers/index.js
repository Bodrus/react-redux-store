import update from 'immutability-helper';

const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 0
};

const updateOrder = (state, action, quantity) => {
  const { cartItems, books } = state;

  const bookId = action.payload;
  const book = books.find((book) => book.id === bookId);
  const itemIndex = cartItems.findIndex(({ id }) => id === bookId);

  if (itemIndex === -1) {
    const newItem = {
      id: book.id,
      title: book.title,
      count: 1,
      total: book.price
    };
    return [...cartItems, newItem]
  }

  const { count, total } = cartItems[itemIndex];

  if (count + quantity === 0) {
    return cartItems.filter(({ id }) => id !== bookId);
  }

  const newCartItems = update(cartItems, {
    [itemIndex]: {
      $set: {
        count: count + quantity,
        total: total + book.price * quantity,
        id: book.id,
        title: book.title
      }
    }
  });
  return newCartItems;
};



const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'FETCH_BOOKS_REQUESTET':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      }

    case 'BOOK_ADDED_TO_CART':
      return {
        ...state,
        cartItems: updateOrder(state, action, 1)
      };

    case 'ALL_BOOKS_REMOVE_FROM_CART':
      const id = action.payload;
      const newCartItems = state.cartItems.filter(book => book.id !== id);
      return {
        ...state,
        cartItems: newCartItems
      };

    case 'BOOK_REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: updateOrder(state, action, -1)
      };

    default:
      return state;
  }
};

export default reducer;