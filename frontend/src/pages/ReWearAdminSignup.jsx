import React, { useState } from 'react';
import { Shirt, Shield, Eye, EyeOff, Check, Mail, Lock, User } from 'lucide-react';

export default function ReWearAdminSignup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: '',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.adminCode || !formData.termsAccepted) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/accounts/create-superuser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret_key: formData.adminCode,
          username: formData.fullName.replace(/\s+/g, '-').toLowerCase(),
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Admin account created successfully! You can now log in.');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          adminCode: '',
          termsAccepted: false
        });

        window.location.href = 'http://localhost:8000/admin';
      } else {
        alert(data.message || 'Failed to create admin account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating admin account:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <Shirt className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ReWear
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Admin Registration
          </h1>
          <p className="text-gray-300">Create your admin account</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
          {/* Admin Secret Key */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-sm font-semibold text-purple-300">Admin Secret Key</span>
            </div>
            <input
              type="password"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleInputChange}
              placeholder="Enter admin secret key"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Full Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {formData.password && (
              <div className="mt-2">
                <div className="flex space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        i < getPasswordStrength() ? strengthColors[getPasswordStrength() - 1] : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Password strength: {strengthLabels[getPasswordStrength() - 1] || 'Very Weak'}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mb-6">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div
                  onClick={() => setFormData(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }))}
                  className={`w-6 h-6 rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    formData.termsAccepted
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {formData.termsAccepted && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
              <label className="text-sm text-gray-300 cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">Terms and Conditions</a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Admin Account'
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an admin account?{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>© 2025 ReWear. Administrative access is monitored and logged.</p>
        </div>
      </div>
    </div>
  );
}
