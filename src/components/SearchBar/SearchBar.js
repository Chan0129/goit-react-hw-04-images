import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import Toastify from 'components/Toastify';
import styles from './SearchBar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({
      searchQuery: event.target.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    const { searchQuery } = this.state;
    event.preventDefault();
    if (searchQuery.trim() === '') {
      Toastify('warning', 'Enter the name of the picture or photo!');
    } else {
      this.props.onSubmit(searchQuery.trim());
      this.setState({ searchQuery: '' });
    }
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={styles.searchbar}>
        <form className={styles['search-form']} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles['search-form-button']}>
            <ImSearch style={{ width: 22, height: 22 }} />
            <span className={styles['search-form-button-label']}>Search</span>
          </button>
          <input
            className={styles['search-form-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
