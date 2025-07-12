import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft, User, Sparkles } from 'lucide-react';

export default function ReWearRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setError('');

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        console.log('Registration successful:', data);
        alert('Registration successful! Welcome to ReWear!');
        // You can redirect or store auth token here
        // Example: localStorage.setItem('token', data.token);
        // Example: window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shirt className="w-8 h-8 text-purple-400" />
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ReWear
              </div>
            </div>
            <div className="flex items-center space-x-4">
            <Link to="/">
              <button className="flex items-center px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-purple-400 mr-2" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Join ReWear
              </h1>
              <Sparkles className="w-8 h-8 text-pink-400 ml-2" />
            </div>
            <p className="text-xl text-gray-300 mb-2">
              Welcome to the future of sustainable fashion! 
            </p>
            <p className="text-lg text-purple-300">
              ✨ Start your eco-friendly wardrobe journey today ✨
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 bg-white/10 border border-white/20 rounded focus:ring-purple-400 focus:ring-2 text-purple-400"
                />
                <span className="ml-2 text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Privacy Policy
                  </a>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-gray-300">
              Already have an account?{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold">
                Sign in here
              </a>
            </p>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                🌟 Welcome to the ReWear Community! 🌟
              </h3>
              <p className="text-sm text-gray-300">
                Join thousands of eco-conscious fashion lovers making a positive impact on our planet. 
                Every pre-loved piece you buy or sell helps reduce fashion waste! 
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse"></div>
    </div>
  );
}