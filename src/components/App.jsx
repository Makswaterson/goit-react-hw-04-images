import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { fetchImages } from '../services/pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setlargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const onFormSubmit = inputValue => {
    setInputValue(inputValue);
    setPictures([]);
    setPage(1);
    setError(null);
  };

  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    const fetchPictures = async () => {
      try {
        setLoader(true);
        const { hits, totalHits } = await fetchImages(inputValue, page);
        if (hits.length === 0) {
          toast.error(`Sorry.There are not photos of ${inputValue} ... 😭`);
        }
        setPictures(prevState => [...prevState, ...hits]);
        setShowBtnLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error);
        toast.error(
          console.log(error),
          `Sorry.There are some problems, reload and try again ... 😭`
        );
      } finally {
        setLoader(false);
      }
    };
    fetchPictures();
  }, [inputValue, page]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(prevState => !prevState);
    setTags(tags);
    setlargeImageURL(largeImageURL);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery pictures={pictures} onClick={toggleModal} />
      {showBtnLoadMore && <Button onClick={onLoadMore} />}
      {loader && <Loader />}
      {showModal && (
        <Modal src={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
};
