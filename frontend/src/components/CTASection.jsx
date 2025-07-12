import React from 'react';

const CTASection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-6 py-12 bg-white dark:bg-gray-950">
      <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
        Start Swapping
      </button>
      <button className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
        Browse Items
      </button>
      <button className="border border-indigo-600 text-indigo-600 dark:text-indigo-400 px-6 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition">
        List an Item
      </button>
    </section>
  );
};

export default CTASection;
