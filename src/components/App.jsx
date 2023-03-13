import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { fetchImages } from '../services/pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    inputValue: '',
    pictures: [],
    page: 1,
    error: null,
    loader: false,
    showBtnLoadMore: false,
    per_page: 12,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  onFormSubmit = inputValue => {
    this.setState({
      inputValue: inputValue,
      pictures: [],
      page: 1,
      error: null,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { inputValue, page } = this.state;
    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      this.fetchPictures(inputValue, page);
    }
  }
  fetchPictures = async (value, page) => {
    try {
      this.setState({ loader: true });
      const { hits, totalHits } = await fetchImages(value, page);
      if (hits.length === 0) {
        toast.error(
          `Sorry.There are not photos of ${this.state.inputValue} ... 😭`
        );
      }
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits],
        showBtnLoadMore:
          prevState.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      toast.error(`Sorry.There are some problems, reload and try again ... 😭`);
    } finally {
      this.setState({ loader: false });
    }
  };
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      tags,
      largeImageURL,
    }));
  };

  render() {
    const {
      pictures,
      largeImageURL,
      tags,
      showModal,
      loader,
      showBtnLoadMore,
    } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery pictures={pictures} onClick={this.toggleModal} />
        {showBtnLoadMore && <Button onClick={this.onLoadMore} />}
        {loader && <Loader />}
        {showModal && (
          <Modal src={largeImageURL} alt={tags} onClose={this.toggleModal} />
        )}
        <Toaster
          toastOptions={{
            duration: 2000,
          }}
        />
      </div>
    );
  }
}
