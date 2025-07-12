import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    closeModal();
    navigate('/home'); // Simulate login success
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-900 !p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl !mb-4 text-center dark:text-white">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="!px-4 !py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="!px-4 !py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <button type="submit" className="bg-indigo-600 text-white !py-2 rounded-md">
            {isSignUp ? 'Create Account' : 'Log In'}
          </button>
        </form>
        <p
          className="!mt-4 text-center text-sm text-blue-500 cursor-pointer"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Sign In' : 'New here? Sign Up'}
        </p>
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500">✕</button>
      </motion.div>
    </div>
  );
};

export default AuthModal;
