import React, { useState, useEffect } from 'react';
import './App.module.css';
import Loader from './components/Loader';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import apiFetchHits from './services/api';

export default function App() {
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setlargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user] = useState('');

  const onChangeQuery = query => {
    setQuery(query);
    setCurrentPage(1);
    setHits([]);
    setError(null);
  };

  const scrollBtn = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchHits = () => {
      setIsLoading(true);

      apiFetchHits({ searchQuery: query, currentPage })
        .then(responseHits => {
          setHits(prevHits => [...prevHits, ...responseHits]);
          if (currentPage >= 1) {
            setTimeout(() => {
              scrollBtn();
            }, 1000);
          }
        })
        .catch(error => setError(error.message))
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchHits();
  }, [query, currentPage]);

  const openModal = imgModal => {
    setlargeImageURL(imgModal);
    setShowModal(true);
  };

  const closeModal = () => {
    setlargeImageURL('');
    setShowModal(false);
  };

  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const renderButton = hits.length > 0 && !isLoading;

  return (
    <>
      {error && <h1>404 error: File not found</h1>}

      <Searchbar onSubmit={onChangeQuery} />

      {isLoading && <Loader />}

      <ImageGallery hits={hits} imgModal={openModal} />

      {renderButton && <Button onClick={updatePage} />}

      {showModal && (
        <Modal onClose={closeModal} largeImageURL={largeImageURL} alt={user} />
      )}
    </>
  );
}
