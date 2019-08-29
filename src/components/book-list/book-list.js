import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { booksLoaded } from '../../actions';

import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';
import Spiner from '../spiner';
import './book-list.css'



// const {inc, dec} = bindActionCreaters(actions, dispatch);
// connect(mapStateToProps, actions)(Counter)
class BookList extends Component {

  componentDidMount() {
    const { booksLoaded, bookstoreService } = this.props;
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data));
  }

  render() {
    const { books, loading } = this.props;
    if (loading) {
      return <Spiner />
    }
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
    loading: state.loading
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