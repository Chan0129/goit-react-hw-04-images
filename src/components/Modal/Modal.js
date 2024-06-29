import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, fullSize, name }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = useCallback(
    event => {
      if (event.currentTarget === event.target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <img src={fullSize} alt={name} />
      </div>
      <button
        type="button"
        className={styles['button-close']}
        onClick={onClose}
      >
        <AiOutlineCloseCircle style={{ width: 36, height: 36 }} />
      </button>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  fullSize: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Modal;
