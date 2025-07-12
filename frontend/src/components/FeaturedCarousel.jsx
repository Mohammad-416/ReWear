import React from 'react';

const items = [
  { id: 1, title: 'Mountain Bike', image: '/bike.jpg' },
  { id: 2, title: 'Guitar', image: '/guitar.jpg' },
  { id: 3, title: 'Board Games Set', image: '/games.jpg' },
];

const FeaturedCarousel = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <h3 className="text-3xl text-center font-semibold text-gray-800 dark:text-white mb-6">
        Featured Swaps
      </h3>
      <div className="flex overflow-x-auto gap-6 px-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-[250px] bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCarousel;
