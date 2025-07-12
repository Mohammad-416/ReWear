import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/home');
        }}
        className="bg-white dark:bg-gray-800 !p-8 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl !mb-4 text-center dark:text-white">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full !mb-3 !px-4 !py-2 rounded border dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 !px-4 1!py-2 rounded border dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white w-full !py-2 rounded hover:bg-indigo-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
