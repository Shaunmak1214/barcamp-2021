import { useState } from 'react';
import PropTypes from 'prop-types';

const useModal = ({ initialState }) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onModalClose = () => {
    setIsOpen(false);
  };

  const onModalOpen = () => {
    setIsOpen(true);
  };

  return { isOpen, onModalClose, onModalOpen };
};

useModal.propTypes = {
  initialState: PropTypes.bool,
};

export default useModal;
