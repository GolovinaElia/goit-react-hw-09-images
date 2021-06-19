import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_URL = '20750670-b2684aaeba19f295ef3b80ff2';

const apiFetchHits = ({ searchQuery = '', currentPage = 1 }) => {
  return axios
    .get(
      `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${KEY_URL}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default apiFetchHits;
