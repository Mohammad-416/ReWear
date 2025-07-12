import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarLanding from './components/NavbarLanding';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

const App = () => {
  return (
    
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <NavbarLanding />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
   
  );
};

export default App;
