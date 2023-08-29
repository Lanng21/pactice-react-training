import React, { memo } from 'react';

type TagProps = {
  status: string;
};

const Tag: React.FC<TagProps> = ({ status }) => {
  const tagClass = status === 'available' ? 'tag-active' : 'tag-inactive';

  return <span className={`tag ${tagClass}`}>{status}</span>;
};

export default memo(Tag);
