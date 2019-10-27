import React from 'react';
import { useState } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

const AddBook = (props) => {

  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(bookName, genre, authorId);
    props.addBookMutation(
      {
        variables: {
          name: bookName,
          genre,
          authorId
        },
        refetchQueries: [{query: getBooksQuery}]
      });
  }

  const showAuthorName = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading....</option>
    } else {
      return data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
    }
  }

  return (
    <form id="add-book" className="add-book">
      <div className='field'>
        <label>Book Name : </label>
        <input type="text" onChange={(e) => setBookName(e.target.value)} value={bookName} />
      </div>

      <div className='field'>
        <label>Genre : </label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} value={genre} />
      </div>

      <div className='field'>
        <label>Author Name : </label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option value={null}>---select---</option>
          {showAuthorName()}
        </select>
      </div>
      <button type="submit" onClick={onSubmit}>Add +</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
