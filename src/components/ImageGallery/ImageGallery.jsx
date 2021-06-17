import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ hits, imgModal }) => (
  <ul className={style.ImageGallery}>
    {hits.map(({ id, webformatURL, largeImageURL, user }) => (
      <li key={id} className={style.ImageGalleryItem}>
        <ImageGalleryItem
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          user={user}
          imgModal={imgModal}
        />
      </li>
    ))}
  </ul>
);

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ImageGallery;
