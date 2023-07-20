import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

class Searchbar extends Component {
  state = {
    searchRequest: '',
  };

  handleRequestChange = e => {
    this.setState({ searchRequest: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.searchRequest.trim()) {
      return Notify.failure('Fill in the request');
    }

    this.props.onSubmit(this.state.searchRequest);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span>
              <AiOutlineSearch className={css.buttonlabel} />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            value={this.state.searchRequest}
            onChange={this.handleRequestChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
