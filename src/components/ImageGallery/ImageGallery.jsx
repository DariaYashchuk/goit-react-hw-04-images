import ImageGalleryItem from '../ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ searchData }) => {
  return (
    <div>
      <ul className={css.gallery}>
        {searchData.map(item => (
          <ImageGalleryItem key={item.id} webformatURL={item.webformatURL} />
        ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  searchData: PropTypes.array.isRequired,
};

export default ImageGallery;
