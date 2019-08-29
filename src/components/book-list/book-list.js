import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { booksLoaded } from '../../actions';

import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';
import './book-list.css'



// const {inc, dec} = bindActionCreaters(actions, dispatch);
// connect(mapStateToProps, actions)(Counter)
class BookList extends Component {

  componentDidMount() {
    // 1. receive data
    const { booksLoaded, bookstoreService } = this.props;
    const books = bookstoreService.getBooks();

    // 2. dispacth action to store
    booksLoaded(books);
  }

  render() {
    const { books } = this.props;
    return (
      <ul className="book-list">
        {books.map(book => <li key={book.id}><BookListItem book={book} /></li>)}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  const props = {
    books: state.books,
  }
  return props;
};

const mapDispatchToProps = {
  booksLoaded
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);