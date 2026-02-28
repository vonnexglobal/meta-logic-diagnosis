'use client';

import React from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
      <div className="glass-card rounded-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-4">发生错误</h1>
        <p className="text-gray-400 mb-6">
          {error.message || '页面加载时出现了问题'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-dark-900 font-medium rounded-lg hover:bg-opacity-90 btn-primary"
        >
          重试
        </button>
      </div>
    </div>
  );
};

export default Error;