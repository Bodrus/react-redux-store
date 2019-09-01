import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { fetchBooks, bookAddedtoCart } from '../../actions';

import ErrorIndicator from '../error-indicator';
import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';
import Spiner from '../spiner';
import './book-list.css'



const BookList = ({ books, onAddCart }) => {
  return (
    <ul className="book-list">
      {books.map(book =>
        <li key={book.id}>
          <BookListItem book={book} onAddCart={() => onAddCart(book.id)} />
        </li>)}
    </ul>
  )
};

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddCart } = this.props;

    if (loading) {
      return <Spiner />
    }
    if (error) {
      return <ErrorIndicator />
    }
    return <BookList books={books} onAddCart={onAddCart} />
  }
}

const mapStateToProps = state => {
  const props = {
    books: state.books,
    loading: state.loading,
    error: state.error
  }
  return props;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddCart: (id) => dispatch(bookAddedtoCart(id))
  }
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);