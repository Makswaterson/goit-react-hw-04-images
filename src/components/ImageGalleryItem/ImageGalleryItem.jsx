import React from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <li className="gallery-item">
      <img
        className="image-gallery"
        src={webformatURL}
        alt={tags}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
