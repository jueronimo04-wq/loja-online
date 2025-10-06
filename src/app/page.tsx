'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Star, 
  Filter, 
  Search, 
  Plus, 
  Minus, 
  X, 
  CreditCard, 
  Shield, 
  Truck, 
  RotateCcw,
  Heart,
  User,
  Menu,
  ChevronDown
} from 'lucide-react';
import { Product, CartItem, Category, PaymentMethod } from '@/lib/types';
import { products, categories, reviews, getCartFromStorage, saveCartToStorage, formatPrice, calculateDiscount } from '@/lib/data';

export default function DirectOneStore() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutData, setCheckoutData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    paymentMethod: 'card' as PaymentMethod
  });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = getCartFromStorage();
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate checkout process
    alert('Order placed successfully! Thank you for shopping with DirectOne.');
    setCart([]);
    setIsCheckoutOpen(false);
    setCheckoutData({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postcode: '',
      paymentMethod: 'card'
    });
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{calculateDiscount(product.originalPrice, product.price)}%
          </div>
        )}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.inStock ? (
            <span className="text-green-600 text-sm font-medium">In Stock</span>
          ) : (
            <span className="text-red-600 text-sm font-medium">Out of Stock</span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProduct(product)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src={product.image} alt={product.name} className="w-full rounded-xl" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                disabled={!product.inStock}
                className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
            <div className="space-y-6">
              {reviews.filter(review => review.productId === product.id).map(review => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.userName}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified Purchase</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CartSidebar = () => (
    <div className={`fixed inset-0 z-50 ${isCartOpen ? 'visible' : 'invisible'}`}>
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart ({getTotalItems()})</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded ml-auto"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Total: {formatPrice(getTotalPrice())}</span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const CheckoutModal = () => (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isCheckoutOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleCheckout} className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={checkoutData.email}
                  onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={checkoutData.firstName}
                    onChange={(e) => setCheckoutData({...checkoutData, firstName: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={checkoutData.lastName}
                    onChange={(e) => setCheckoutData({...checkoutData, lastName: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={checkoutData.address}
                  onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={checkoutData.city}
                    onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postcode"
                    value={checkoutData.postcode}
                    onChange={(e) => setCheckoutData({...checkoutData, postcode: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4 mt-8">Payment Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'paypal', name: 'PayPal', icon: Shield },
                ].map(method => (
                  <label key={method.id} className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={checkoutData.paymentMethod === method.id}
                      onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value as PaymentMethod})}
                      className="text-slate-900"
                    />
                    <method.icon className="w-5 h-5" />
                    <span>{method.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="text-sm">{item.product.name} × {item.quantity}</span>
                    <span className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D1</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">DirectOne</h1>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-gray-700 hover:text-slate-900 transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-slate-900 transition-colors">Products</a>
                <a href="#" className="text-gray-700 hover:text-slate-900 transition-colors">About</a>
                <a href="#" className="text-gray-700 hover:text-slate-900 transition-colors">Contact</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent w-64"
                />
              </div>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-slate-900 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-slate-900 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      {/* Trust Indicators */}
      <div className="bg-slate-900 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-between text-sm">
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free UK delivery over £50</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure payments</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <span>Trusted by 50,000+ customers across the UK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Products, <span className="text-slate-900">Direct to You</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of high-quality products with fast, reliable delivery across the UK.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-sm">D1</span>
                </div>
                <h3 className="text-xl font-bold">DirectOne</h3>
              </div>
              <p className="text-gray-300">
                Your trusted partner for premium products with exceptional service across the UK.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 DirectOne. All rights reserved. | Registered in England & Wales</p>
          </div>
        </div>
      </footer>

      {/* Modals and Sidebars */}
      <CartSidebar />
      {isCheckoutOpen && <CheckoutModal />}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}