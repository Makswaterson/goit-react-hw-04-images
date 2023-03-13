import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const onChange = e => {
    setInput(e.target.value.toLowerCase().trim());
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    if (!input) {
      return toast.error('Enter your query, the search bar is empty!');
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={onHandleSubmit}>
        <button type="submit" className="search-button">
          <FcSearch width={20} />
          <span className="search-button-label">Search</span>
        </button>

        <input
          value={input}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
