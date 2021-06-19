import React, { Component } from 'react';
import style from './Searchbar.module.css';

// export default function Searchbar() {
//   const [query, setQuery] = useState('');

//   const handleSubmit = event => {
//     event.preventDefault();
//     this.props.onSubmit(query);
//     setQuery({ query: '' });
//   };

//   const handleChange = event => {
//     setQuery(event.currentTarget.value);
//   };

//   return (
//     <header className={style.Searchbar}>
//       <form className={style.SearchForm} onSubmit={handleSubmit}>
//         <button type="submit" className={style.SearchFormButton}>
//           <span className={style.SearchFormButtonLabel}>Search</span>
//         </button>

//         <input
//           className={style.SearchFormInput}
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//           value={query}
//           onChange={handleChange}
//         />
//       </form>
//     </header>
//   );
// }

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
