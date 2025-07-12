import React, { useState } from 'react';
import {
  ArrowLeft,
  Award,
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Heart,
  MapPin,
  MessageCircle,
  Package,
  Shield,
  Shirt,
  Star,
  Truck,
  User,
  Zap,
  AlertCircle,
  CheckCircle,
  Share2
} from 'lucide-react';

export default function ItemDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [selectedTab, setSelectedTab] = useState('description');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const item = {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "This classic vintage denim jacket is a timeless piece that adds effortless cool to any outfit.",
    category: "outerwear",
    type: "jacket",
    size: "M",
    condition: "excellent",
    points: 120,
    swapAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop"
    ],
    uploader: {
      name: "Sarah M.",
      rating: 4.8,
      totalItems: 23,
      completedSwaps: 15,
      joinedDate: "June 2023",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    location: "New York, NY",
    dateAdded: "2 days ago",
    views: 145,
    tags: ["vintage", "denim", "classic", "90s", "streetwear"],
    brand: "Levi's",
    originalPrice: 89,
    measurements: {
      chest: "21 inches",
      length: "25 inches",
      shoulder: "18 inches",
      sleeve: "24 inches"
    },
    materials: ["100% Cotton", "Metal buttons", "Cotton lining"],
    careInstructions: "Machine wash cold, tumble dry low, do not bleach",
    availability: "available",
    shippingInfo: {
      domestic: "Free shipping within US",
      international: "Available for $15",
      processing: "1-2 business days"
    }
  };

  const toggleWishlist = (itemId) => {
    setWishlist((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'like-new': return 'text-green-400';
      case 'excellent': return 'text-green-300';
      case 'very-good': return 'text-yellow-400';
      case 'good': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getAvailabilityStatus = () => {
    switch (item.availability) {
      case 'available': return { icon: CheckCircle, color: 'text-green-400', text: 'Available' };
      case 'pending': return { icon: Clock, color: 'text-yellow-400', text: 'Pending' };
      case 'sold': return { icon: AlertCircle, color: 'text-red-400', text: 'Sold' };
      default: return { icon: CheckCircle, color: 'text-green-400', text: 'Available' };
    }
  };

  const status = getAvailabilityStatus();
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => window.history.back()} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <Shirt className="w-8 h-8 text-purple-400" />
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ReWear
                </div>
              </div>
            </div>
            {isLoggedIn && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-400/30">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold">{userPoints}</span>
                  <span className="text-sm text-gray-300">pts</span>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <User className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {!isLoggedIn ? (
        <div className="min-h-screen flex items-center justify-center text-center text-white py-20">
          <div>
            <h2 className="text-2xl font-bold mb-4">Please Sign In or Sign Up</h2>
            <p className="text-gray-300">You must be logged in to view this item.</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* ... rest of the content */}
        </div>
      )}
    </div>
  );
}
