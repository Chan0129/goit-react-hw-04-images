import PropTypes from 'prop-types';
import { useEffect } from 'react'; // Importing only useEffect from 'react'
import { Slide, toast } from 'react-toastify';

const Toastify = ({ type, nameToastify }) => {
  useEffect(() => {
    const showToast = () => {
      toast(nameToastify, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide,
        type: type,
      });
    };

    showToast();
  }, [type, nameToastify]);

  return null;
};

Toastify.propTypes = {
  type: PropTypes.string.isRequired,
  nameToastify: PropTypes.string.isRequired,
};

export default Toastify;
