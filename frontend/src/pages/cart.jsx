import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  CreditCard, 
  Award, 
  Star, 
  Shield, 
  Truck, 
  RefreshCw,
  Heart,
  Eye,
  Check,
  AlertCircle,
  Info,
  MapPin,
  Clock,
  User,
  Package
} from 'lucide-react';

export default function ReWearCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Vintage Leather Jacket",
      category: "Outerwear",
      seller: "Sarah M.",
      sellerRating: 4.9,
      points: 200,
      quantity: 1,
      condition: "excellent",
      size: "M",
      color: "Black",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
      views: 89,
      likes: 24,
      inStock: true,
      estimatedDelivery: "3-5 days"
    },
    {
      id: 2,
      title: "Designer Handbag",
      category: "Accessories",
      seller: "Emma L.",
      sellerRating: 4.7,
      points: 180,
      quantity: 1,
      condition: "like-new",
      size: "One Size",
      color: "Brown",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
      views: 56,
      likes: 18,
      inStock: true,
      estimatedDelivery: "2-4 days"
    },
    {
      id: 3,
      title: "Silk Designer Scarf",
      category: "Accessories",
      seller: "Mike D.",
      sellerRating: 4.8,
      points: 80,
      quantity: 1,
      condition: "new",
      size: "One Size",
      color: "Multicolor",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop",
      views: 34,
      likes: 12,
      inStock: false,
      estimatedDelivery: "5-7 days"
    }
  ]);

  const [userPoints] = useState(1250);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('points');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: 'John Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(555) 123-4567'
  });

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPoints = () => {
    return cartItems.reduce((total, item) => total + (item.points * item.quantity), 0);
  };

  const getAvailableItems = () => {
    return cartItems.filter(item => item.inStock);
  };

  const getUnavailableItems = () => {
    return cartItems.filter(item => !item.inStock);
  };

  const CartItemCard = ({ item }) => (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300 ${!item.inStock ? 'opacity-60' : ''}`}>
      <div className="flex space-x-4">
        <div className="relative">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          {!item.inStock && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.category} • {item.size} • {item.color}</p>
              <div className="flex items-center space-x-2 mt-1">
                <User className="w-3 h-3 text-gray-400" />
                <span className="text-sm text-gray-300">{item.seller}</span>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-400 ml-1">{item.sellerRating}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 hover:text-red-300 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  <span>{item.views}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-purple-400">
                {item.points * item.quantity} pts
              </div>
              <div className="text-xs text-gray-400">
                <Truck className="w-3 h-3 inline mr-1" />
                {item.estimatedDelivery}
              </div>
            </div>
          </div>
          
          {!item.inStock && (
            <div className="mt-2 flex items-center text-sm text-red-400">
              <AlertCircle className="w-4 h-4 mr-1" />
              Currently unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CheckoutModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-white/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Checkout</h2>
            <button 
              onClick={() => setShowCheckout(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="points"
                  checked={paymentMethod === 'points'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium">ReWear Points</div>
                    <div className="text-sm text-gray-400">You have {userPoints} points available</div>
                  </div>
                </div>
              </label>
              
              <label className="flex items-center p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="hybrid"
                  checked={paymentMethod === 'hybrid'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-medium">Points + Card</div>
                    <div className="text-sm text-gray-400">Use points first, then card for remaining balance</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{shippingAddress.fullName}</div>
                <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
              </div>
              <div className="text-sm text-gray-400">
                <div>{shippingAddress.address}</div>
                <div>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</div>
                <div>{shippingAddress.phone}</div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {getAvailableItems().map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-purple-400 font-medium">{item.points * item.quantity} pts</div>
                </div>
              ))}
              
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span className="text-purple-400">{getAvailableItems().reduce((total, item) => total + (item.points * item.quantity), 0)} pts</span>
                </div>
                {paymentMethod === 'points' && getAvailableItems().reduce((total, item) => total + (item.points * item.quantity), 0) > userPoints && (
                  <div className="text-red-400 text-sm mt-2">
                    Insufficient points. You need {getAvailableItems().reduce((total, item) => total + (item.points * item.quantity), 0) - userPoints} more points.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowCheckout(false)}
              className="flex-1 bg-white/10 border border-white/20 px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button 
              disabled={paymentMethod === 'points' && getAvailableItems().reduce((total, item) => total + (item.points * item.quantity), 0) > userPoints}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">Shopping Cart</h1>
                <p className="text-sm text-gray-400">{cartItems.length} items in your cart</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-400/30">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="font-semibold">{userPoints}</span>
                <span className="text-sm text-gray-300">points</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Start shopping to add items to your cart</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              Browse Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Available Items */}
              {getAvailableItems().length > 0 && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-green-400" />
                    Available Items ({getAvailableItems().length})
                  </h3>
                  <div className="space-y-4">
                    {getAvailableItems().map(item => (
                      <CartItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Unavailable Items */}
              {getUnavailableItems().length > 0 && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                    Unavailable Items ({getUnavailableItems().length})
                  </h3>
                  <div className="space-y-4">
                    {getUnavailableItems().map(item => (
                      <CartItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Available Items</span>
                    <span>{getAvailableItems().length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Unavailable Items</span>
                    <span>{getUnavailableItems().length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-purple-400 font-semibold">
                      {getAvailableItems().reduce((total, item) => total + (item.points * item.quantity), 0)} pts
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-purple-400">
                        {getAvailableItems().reduce((total, item) => total + (item.points * item.quantity), 0)} pts
                      </span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowCheckout(true)}
                  disabled={getAvailableItems().length === 0}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </button>
                
                {getAvailableItems().reduce((total, item) => total + (item.points * item.quantity), 0) > userPoints && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    You need {getAvailableItems().reduce((total, item) => total + (item.points * item.quantity), 0) - userPoints} more points to complete this purchase.
                  </div>
                )}
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Purchase Protection
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-400" />
                    Quality guarantee
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-400" />
                    7-day return policy
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-400" />
                    Secure transactions
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-400" />
                    Free shipping on all orders
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-yellow-400" />
                  Need More Points?
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  List items from your closet to earn more points!
                </p>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showCheckout && <CheckoutModal />}
    </div>
  );
}