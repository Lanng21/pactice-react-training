import React, { useEffect } from 'react';

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      {type === 'success' ? 'Success: ' : 'Error: '}
      {message}
    </div>
  );
};

export default Notification;
