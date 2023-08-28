import React from 'react';

// components
import ModalForm from '../Form';
import Button from '../Button';

interface DeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}
function DeleteConfirmModal({ onClose, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div className="overlay">
      <ModalForm onClose={onClose} showDeleteImage>
        <h6 className="title-delete">Delete Product</h6>
        <p className="description-delete">
          Are you sure you want to delete this product? this action cannot be
          undone
        </p>
        <div className="buttons">
          <Button className="cancel-delete" onClick={onClose}>
            Cancel
          </Button>
          <Button className="delete" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </ModalForm>
    </div>
  );
}

export default DeleteConfirmModal;
