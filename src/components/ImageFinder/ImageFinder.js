import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from 'components/SearchBar';
import ImageGallery from 'components/ImageGallery';
import Loading from 'components/Loading';
import Toastify from 'components/Toastify';
import Modal from 'components/Modal';
import Button from 'components/Button';
import PixabayAPI from '../../apiServices/';
import scrollBottom from '../../helpers/scrollBottom';
import scrollTop from '../../helpers/scrollTop';
import styles from './ImageFinder.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
};

const ImageFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alt, setAlt] = useState(null);
  const [fullSize, setFullSize] = useState(null);
  const [page, setPage] = useState(1);

  const fetchImages = useCallback(async () => {
    const { PENDING, RESOLVED } = Status;

    setStatus(PENDING);
    try {
      const responseImages = await PixabayAPI(searchQuery, page);
      if (responseImages.length === 0) {
        Toastify(
          'warning',
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setImages([]);
      } else {
        setImages(prevImages =>
          page === 1 ? responseImages : [...prevImages, ...responseImages]
        );
      }
      setStatus(RESOLVED);
      if (page > 1) scrollBottom();
    } catch (error) {
      setStatus(null);
      Toastify('error', `${error}`);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    if (searchQuery) {
      fetchImages();
    }
  }, [fetchImages, searchQuery]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const handleClick = event => {
    if (showModal) {
      setShowModal(false);
      setAlt(null);
      setFullSize(null);
    } else {
      if (event.target.nodeName !== 'IMG') return;
      setShowModal(true);
      setAlt(event.target.alt);
      setFullSize(event.target.dataset.fullsize);
    }
  };

  const getLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles['image-finder']}>
      <SearchBar onSubmit={handleFormSubmit} />
      {status === 'pending' && <Loading />}
      {status === 'resolved' && (
        <ImageGallery images={images} onClick={handleClick} />
      )}
      {images.length > 11 && status === 'resolved' && (
        <Button
          name={'Load more'}
          nameClass="load-button"
          onClick={getLoadMore}
        />
      )}
      {images.length > 11 && (
        <Button name={'To UP'} nameClass="up-button" onClick={scrollTop} />
      )}
      {showModal && (
        <Modal onClose={handleClick} fullSize={fullSize} name={alt} />
      )}
    </div>
  );
};

export default ImageFinder;
