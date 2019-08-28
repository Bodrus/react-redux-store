import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { booksLoaded } from '../../actions';

import { withBookstoreService } from '../hoc';
import './book-list.css'

const mapStateToProps = state => {
  const props = {
    books: state.books,
  }
  return props;
};


//bindActionCreaters
class BookList extends Component {

  componentDidMount() {
    // 1. receive data
    const { dispatch, bookstoreService } = this.props;
    const books = bookstoreService.getBooks();

    // 2. dispacth action to store
    dispatch(booksLoaded(books));

  }

  render() {
    const { books } = this.props;
    return (
      <ul>
        {books.map(book => <li key={book.id}><BookListItem book={book} /></li>)}
      </ul>
    )
  }
}

export default withBookstoreService()(connect(mapStateToProps)(BookList));