import { useEffect } from 'react';
import style from './Modal.module.css';

export default function Modal({ onClose, largeImageURL, user }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return (
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt={user} />
      </div>
    </div>
  );
}
// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return (
//       <div className={style.Overlay} onClick={this.handleBackdropClick}>
//         <div className={style.Modal}>{this.props.children}</div>
//       </div>
//     );
//   }
// }

// export default Modal;
