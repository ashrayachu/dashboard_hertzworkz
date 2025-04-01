import React from 'react';

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="mt-2 text-gray-600">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;