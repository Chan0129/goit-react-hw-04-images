import React, { Component } from 'react';
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

class ImageFinder extends Component {
  state = {
    searchQuery: '',
    images: [],
    status: null,
    showModal: false,
    alt: null,
    fullSize: null,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { PENDING, RESOLVED } = Status;
    const { searchQuery, images, page } = this.state;
    if (prevState.searchQuery === searchQuery && prevState.page === page)
      return;
    this.setState({ status: PENDING });
    await PixabayAPI(searchQuery, page)
      .then(responseImages => {
        if (responseImages.length === 0) {
          Toastify(
            'warning',
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({
            images: [],
          });
        } else if (prevState.searchQuery === searchQuery) {
          this.setState({
            images: [...images, ...responseImages],
          });
        } else {
          this.setState({
            images: responseImages,
          });
        }
        return this.setState({
          status: RESOLVED,
        });
      })
      .catch(error => {
        this.setState({ status: null });
        Toastify('error', `${error}`);
      });
    if (prevState.searchQuery === searchQuery) scrollBottom();
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  handleClick = event => {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: !showModal,
        alt: null,
        fullSize: null,
      });
    } else {
      if (event.target.nodeName !== 'IMG') return;
      this.setState({
        showModal: !showModal,
        alt: event.target.alt,
        fullSize: event.target.dataset.fullsize,
      });
    }
  };

  getLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, showModal, alt, fullSize } = this.state;
    return (
      <div className={styles['image-finder']}>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loading />}
        {status === 'resolved' && (
          <ImageGallery images={images} onClick={this.handleClick} />
        )}
        {images.length > 11 && status === 'resolved' && (
          <Button
            name={'Load more'}
            nameClass="load-button"
            onClick={this.getLoadMore}
          />
        )}
        {images.length > 11 && (
          <Button name={'To UP'} nameClass="up-button" onClick={scrollTop} />
        )}
        {showModal && (
          <Modal onClose={this.handleClick} fullSize={fullSize} name={alt} />
        )}
      </div>
    );
  }
}

export default ImageFinder;
