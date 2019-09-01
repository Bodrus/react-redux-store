import React from 'react';
import './book-list-item.css';

const BookListItem = ({ book, onAddCart }) => {
  const { title, author, price, coverImage } = book;
  return (
    <div className="book-list-item">
      <div className="book-cover">
        <img src={coverImage} alt="cover" />
      </div>
      <div className="book-detals">
        <span className="book-title">{title}</span>
        <div className="book-autor">{author}</div>
        <div className="book-price">{price}</div>
        <button
          onClick={onAddCart}
          className="btn btn-info add-to-card">Add to cart</button>
      </div>
    </div>
  )
};

export default BookListItem;