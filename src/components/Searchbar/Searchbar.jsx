import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchRequest, setSearchRequest] = useState('');

  const handleRequestChange = e => {
    setSearchRequest(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!searchRequest.trim()) {
      return Notify.failure('Fill in the request');
    }

    onSubmit(searchRequest);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span>
            <AiOutlineSearch className={css.buttonlabel} />
          </span>
        </button>

        <input
          className={css.input}
          type="text"
          value={searchRequest}
          onChange={handleRequestChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
