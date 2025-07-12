import { useState } from 'react';
import { useTheme } from '../components/ThemeContext';
import NavbarLanding from '../components/NavbarLanding';
import AuthModal from '../components/AuthModal';
import { motion } from 'framer-motion';

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <NavbarLanding 
        openModal={() => setShowModal(true)} 
        toggleDarkMode={toggleDarkMode}
      />
      {showModal && <AuthModal closeModal={() => setShowModal(false)} />}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center !mt-32 !px-4 text-center"
      >
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Welcome to MyApp
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 !mt-4 max-w-xl">
          Build your productivity with our intuitive tools and features.
        </p>
      </motion.div>
    </div>
  );
};

export default Landing;