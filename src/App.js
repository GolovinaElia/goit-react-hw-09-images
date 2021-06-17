import React, { Component } from 'react';
import './App.module.css';
import Loader from './components/Loader';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import fetchHits from './services/api';

class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    showModal: false,
    largeImageURL: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits();
    }
    setTimeout(() => {
      this.scrollBtn();
    }, 1000);
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
    });
  };

  fetchHits = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });

    fetchHits(options)
      .then(hits =>
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  scrollBtn = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleClickImg = url => {
    this.setState({ largeImageURL: url });
    this.toggleModal();
  };

  render() {
    const { showModal, hits, isLoading, error, largeImageURL } = this.state;
    const renderButton = hits.length > 0 && !isLoading;

    return (
      <>
        {error && <h1>404 error: File not found</h1>}

        <Searchbar onSubmit={this.onChangeQuery} />

        {isLoading && <Loader />}

        <ImageGallery hits={hits} imgModal={this.handleClickImg} />

        {renderButton && <Button onClick={this.fetchHits} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
