import React, { memo, useCallback } from 'react';
import Button from '../Button';
import Clear from '../../assets/images/x-close.svg';
import Delete from '../../assets/images/Featured icon.png';

interface ModalFormProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  showDeleteImage?: boolean;
}

const ModalForm = ({
  title = '',
  children,
  onClose,
  showDeleteImage = false,
}: ModalFormProps) => {
  const handleCancelClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className="overlay" aria-hidden="true">
      <div className="modal-form">
        <div className="header-form">
          {title && <h5>{title}</h5>}
          {showDeleteImage && (
            <figure>
              <img src={Delete} alt="delete" />
            </figure>
          )}
          <Button onClick={handleCancelClick}>
            <img src={Clear} alt="close" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

ModalForm.defaultProps = {
  title: '',
  showDeleteImage: false,
};

export default memo(ModalForm);
