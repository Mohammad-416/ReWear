import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
    >
      Toggle {dark ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default DarkModeToggle;
