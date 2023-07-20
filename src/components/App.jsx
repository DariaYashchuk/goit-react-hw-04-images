// import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    searchRequest: '',
    page: 1,
    searchData: [],
    loading: false,
    isLoadMoreBtnVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchRequest !== this.state.searchRequest ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      const API_KEY = '37001308-90f28619d2b1daf4121817c5e';
      const BASE_URL = 'https://pixabay.com/api/';
      fetch(
        `${BASE_URL}?key=${API_KEY}&q=${this.state.searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}
        `
      )
        .then(res => res.json())
        .then(data => {
          if (data.hits.length === 0) {
            Notify.info('Sorry! It was not found.');
          } else {
            this.setState(prevState => ({
              searchData: [...prevState.searchData, ...data.hits],
              isLoadMoreBtnVisible:
                this.state.page < Math.ceil(data.total / 12),
            }));
          }
        })
        .catch()
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest, page: 1, searchData: [] });
  };

  onLoadMore = e => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { searchData, loading, isLoadMoreBtnVisible, searchRequest, page } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {searchData && <ImageGallery searchData={searchData} />}
        {loading && <Loader />}

        {isLoadMoreBtnVisible && !loading && (
          <Button
            text="Load more"
            searchRequest={searchRequest}
            page={page}
            onLoadMore={this.onLoadMore}
          />
        )}
      </div>
    );
  }
}
