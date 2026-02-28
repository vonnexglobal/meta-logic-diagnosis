import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
      <div className="glass-card rounded-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">页面未找到</h1>
        <p className="text-gray-400 mb-6">
          您访问的页面不存在或已被移除
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-dark-900 font-medium rounded-lg hover:bg-opacity-90 btn-primary inline-block"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFound;