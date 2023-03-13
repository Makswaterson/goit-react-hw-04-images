import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-hot-toast';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  onChange = e => {
    this.setState({ input: e.target.value.toLowerCase().trim() });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.input) {
      return toast.error('Enter your query, the search bar is empty!');
    }
    this.props.onSubmit(this.state.input);

    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
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
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
