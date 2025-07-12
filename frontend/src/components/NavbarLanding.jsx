import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext'; // Adjust path to your ThemeContext

const NavbarLanding = ({ openModal }) => {
  const { darkMode, toggleDarkMode } = useTheme(); // Get theme state and toggle function

  return (
    <nav className={`flex items-center justify-between !px-6 !py-4 shadow-md ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <Link 
        to="/" 
        className="text-xl font-bold"
        style={{ color: darkMode ? 'white' : '#7c3aed' }} // indigo-600 in light mode
      >
        MyApp
      </Link>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode} // Use the toggle function directly
          className={`px-3 py-1 border rounded-md ${
            darkMode ? 'text-white border-gray-600' : 'text-gray-800 border-gray-300'
          }`}
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
        <button
          onClick={openModal}
          className="bg-indigo-600 text-white !px-4 !py-2 rounded-md hover:bg-indigo-700"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default NavbarLanding;