import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => (
  <ul className={styles.gallery} onClick={onClick}>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        webformatURL={image.webformatURL}
        largeImageURL={image.largeImageURL}
        user={image.user}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
