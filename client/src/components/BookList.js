import React from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries';

const BookList = (props) => {

  const displayBooks = () => {
    const data = props.data;
    if (data.loading) {
      return <li>Loading....</li>
    } else {
      return data.books.map(book => <li key={book.id}>{book.name} - {book.genre}</li>)
    }
  }

  return (
    <div className="book-list">
      <ul id="book-list">
      {displayBooks()}
      </ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
