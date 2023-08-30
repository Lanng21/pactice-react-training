import React, { ReactNode, memo, useEffect, useRef } from 'react';

// components
import Button from '../Button';

// icons
import Clear from '../../assets/images/x-close.svg';
import Delete from '../../assets/images/Featured icon.png';

interface ModalFormProps {
  children: ReactNode;
  onClose: () => void;
  title?: string;
  showDeleteImage?: boolean;
}

const ModalForm = ({
  title,
  children,
  onClose,
  showDeleteImage = false,
}: ModalFormProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleCancelClick = () => {
    onClose();
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      className="overlay"
      onClick={handleOverlayClick}
      aria-hidden="true"
      ref={modalRef}
    >
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
