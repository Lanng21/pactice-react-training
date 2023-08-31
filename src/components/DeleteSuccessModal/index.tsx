import React, { memo } from 'react';

// components
import ModalForm from '../Form';
import Button from '../Button';

interface DeleteSuccessProps {
  onClose: () => void;
}
const DeleteSuccess = ({ onClose }: DeleteSuccessProps) => {
  return (
    <ModalForm onClose={onClose} showDeleteImage>
      <div className="success-modal">
        <h6 className="title-delete">Success!</h6>
        <p className="description-delete">!!</p>
        <Button className="close" onClick={onClose}>
          Close
        </Button>
      </div>
    </ModalForm>
  );
};

export default memo(DeleteSuccess);
