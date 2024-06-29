import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { ImSearch } from 'react-icons/im';
import Toastify from 'components/Toastify';
import styles from './SearchBar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = useCallback(event => {
    setSearchQuery(event.target.value.toLowerCase());
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      if (searchQuery.trim() === '') {
        Toastify('warning', 'Enter the name of the picture or photo!');
      } else {
        onSubmit(searchQuery.trim());
        setSearchQuery('');
      }
    },
    [searchQuery, onSubmit]
  );

  return (
    <header className={styles.searchbar}>
      <form className={styles['search-form']} onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
