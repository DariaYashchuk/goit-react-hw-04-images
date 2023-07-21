import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <li className={css.galleryitem}>
      <img
        src={webformatURL}
        alt=""
        className={css.image}
        onClick={toggleModal}
      />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={webformatURL} alt="" />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
