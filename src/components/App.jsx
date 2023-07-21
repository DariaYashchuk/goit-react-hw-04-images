// import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadMoreBtnVisible, setIsLoadMoreBtnVisible] = useState(false);

  useEffect(() => {
    if (searchRequest.trim() === '') {
      return;
    }

    setLoading(true);
    const API_KEY = '37001308-90f28619d2b1daf4121817c5e';
    const BASE_URL = 'https://pixabay.com/api/';
    fetch(
      `${BASE_URL}?key=${API_KEY}&q=${searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}
        `
    )
      .then(res => res.json())
      .then(data => {
        if (data.hits.length === 0) {
          Notify.info('Sorry! It was not found.');
        } else {
          setSearchData(prevSearchData => [...prevSearchData, ...data.hits]);
          setIsLoadMoreBtnVisible(page < Math.ceil(data.total / 12));
        }
      })
      .catch()
      .finally(() => setLoading(false));
  }, [searchRequest, page]);

  const handleFormSubmit = searchRequest => {
    setSearchRequest(searchRequest);
    setPage(1);
    setSearchData([]);
  };

  const onLoadMore = e => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {searchData && <ImageGallery searchData={searchData} />}
      {loading && <Loader />}

      {isLoadMoreBtnVisible && !loading && (
        <Button
          text="Load more"
          searchRequest={searchRequest}
          page={page}
          onLoadMore={onLoadMore}
        />
      )}
    </div>
  );
};
