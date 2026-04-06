import React from 'react'

function EmptyState({ message }) {
  return (
    <div className="text-center py-10 text-gray-400">
      <p className="text-lg">😕 {message}</p>
    </div>
  );
};

export default EmptyState;