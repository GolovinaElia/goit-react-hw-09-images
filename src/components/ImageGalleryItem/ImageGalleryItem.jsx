import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';
import defaultImage from '../Image/default.png';

const ImageGalleryItem = ({ webformatURL, user, largeImageURL, imgModal }) => (
  <img
    src={webformatURL}
    alt={user}
    className={style.ImageGalleryItemImage}
    onClick={() => imgModal(largeImageURL)}
  />
);

ImageGalleryItem.defaultProps = {
  webformatURL: defaultImage,
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
  imgModal: PropTypes.func,
};

export default ImageGalleryItem;
