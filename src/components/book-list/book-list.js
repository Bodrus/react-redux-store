import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions';

import ErrorIndicator from '../error-indicator';
import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';
import Spiner from '../spiner';
import './book-list.css'



// const {inc, dec} = bindActionCreaters(actions, dispatch);
// connect(mapStateToProps, actions)(Counter)
const BookList = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map(book => <li key={book.id}><BookListItem book={book} /></li>)}
    </ul>
  )
};

class BookListContainer extends Component {

  componentDidMount() {
    // const { booksLoaded, bookstoreService, booksRequested, booksError } = this.props;
    // booksRequested();
    // bookstoreService.getBooks()
    //   .then((data) => booksLoaded(data))
    //   .catch((err) => booksError(err));
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error } = this.props;
    if (loading) {
      return <Spiner />
    }

    if (error) {
      return <ErrorIndicator />
    }
    return <BookList books={books} />
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

// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   booksError
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  }
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);