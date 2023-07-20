import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    return (
      <li className={css.galleryitem}>
        <img
          src={this.props.webformatURL}
          alt=""
          className={css.image}
          onClick={this.toggleModal}
        />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.props.webformatURL} alt="" />
          </Modal>
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
