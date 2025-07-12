import React from 'react';

const NavbarLanding = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600">SwapZone</h1>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Sign In
      </button>
    </nav>
  );
};

export default NavbarLanding;
